/**
 * 系统消息渲染器
 * @param h $createElement 函数
 * @param data 要渲染的数据
 * @returns VNode
 */
export default function textRenderer(h, data) {
    const { type, content } = data;
    if(
        type !== 'system' ||
        !content ||
        content.text === undefined ||
        content.text === null
    ) {
        return null;
    }

    const contentNode = h(
        'span',
        {
            staticClass: 'system-message__content',
            domProps: {
                innerHTML: content.text
            }
        }
    );

    return h(
        'content',

        {
            staticClass: 'system-message message-common',
        },

        [contentNode]
    );
}