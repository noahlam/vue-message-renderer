import { getAvatarByUserId } from '../data/mock-data';

export default {
    name: 'Message-Renderer',
    functional: true,
    render(h, ctx) {
        const { data } = ctx.props;
        const { from_user_id } = data;

        const needShowAvatar = !!from_user_id;
        const isFromSelf = from_user_id === 'me';

        const children = [];

        try {
            // 是否需要显示头像
            if (needShowAvatar) {
                const avatarRenderer = require('./avatar.js').default;
                const avatarUrl = getAvatarByUserId(from_user_id);
                const avatarNode = avatarRenderer(h, avatarUrl);
                children.push(avatarNode);
            }

            // 动态消息渲染
            const messageRenderer = require(`./renderers/${ data.type }.js`).default;
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
};