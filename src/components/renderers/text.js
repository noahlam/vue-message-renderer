let triangleNode;

/**
 * 文本消息渲染器
 * @param { function } h 函数（$createElement）
 * @param { Object } data 要渲染的数据
 * @returns { VNode }
 */
export default function textRenderer(h, data) {
    const { content, type } = data;
    const isFromSelf = data.from_user_id === 'me';

    if(
        type !== 'text' ||
        !content ||
        content.text === undefined ||
        content.text === null
    ) {
        return null;
    }

    if (!triangleNode) {
        triangleNode = h(
            'aside',

            {
                staticClass: 'text-message__triangle'
            }
        );
    }

    const contentNode = h(
        'span',

        {
            staticClass: 'text-message__content',
            domProps: {
                innerHTML: content.text
            }
        }
    );

    return h(
        'content',

        {
            staticClass: 'text-message message-common',
            'class': isFromSelf && 'text-message--from-self'
        },

        [triangleNode, contentNode]
    );

}
