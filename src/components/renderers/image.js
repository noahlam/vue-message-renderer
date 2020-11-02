/**
 * 图片消息渲染器
 * @param { function } h 函数（$createElement）
 * @param { Object } data 要渲染的数据
 * @returns { VNode }
 */
export default function imageRenderer(h, data) {
    const { type, content } = data;
    if(
        type !== 'image' ||
        !content ||
        !content.url
    ) {
        return null;
    }

    const imageNode = h(
        'img',

        {
            staticClass: 'image-message__img',
            domProps: {
                src: content.url
            }
        }
    );

    return h(
        'content',

        {
            staticClass: 'image-message message-common'
        },

        [ imageNode ]
    );
}
