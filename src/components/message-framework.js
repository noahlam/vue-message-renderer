import { getAvatarByUserId } from '../data/mock-data';

/**
 * 渲染消息
 * @param { function } h 函数（$createElement）
 * @param { object } data 待渲染数据
 * @param { object } renderers 各类消息定制渲染器
 * @return { VNode }
 */
function $render(h, data, renderers) {
    const { from_user_id: userId, type } = data;
    const needShowAvatar = !!userId;
    const isFromSelf = userId === 'me';
    const children = [];

    try {
        // 是否需要显示头像
        if(needShowAvatar) {
            const avatarRenderer = require('./avatar.js').default;
            const avatarUrl = getAvatarByUserId(userId);
            const avatarNode = avatarRenderer(h, avatarUrl);
            children.push(avatarNode);
        }

        // 动态消息渲染
        const messageRenderer = renderers[type] || require(`./renderers/${ type }.js`).default;

        const messageNode = messageRenderer(h, data);

        children.push(messageNode);

        return h(
            'section',

            {
                staticClass: 'message-box',
                'class': isFromSelf && 'message-box-self'
            },

            children
        );
    }
    catch (e) {
        console.error(e);
        return '';
    }
}

export default {
    name: 'Message-Renderer',
    functional: true,
    render(h, ctx) {
        const {
            renderers = {},
            renderHooks = {}
        } = ctx.props;

        let { data = {} } = ctx.props;

        const { beforeRender, afterRenderer } = renderHooks;
        const { mainRenderer = $render } = renderers;

        // before render hook
        if(typeof beforeRender === 'function') {
            data = beforeRender(data);
        }

        let vnode = mainRenderer(h, data, renderers);

        // after rendered hook
        if(typeof afterRenderer === 'function') {
            vnode = afterRenderer(vnode);
        }

        return vnode;
    }
};
