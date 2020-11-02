/**
 * 头像渲染器
 * @param { function } h 函数（$createElement）
 * @param { string } url 头像地址
 * @returns { VNode }
 */
export default function render(h, url) {
    return h(
        'img',
        {
            staticClass: 'message-avatar',
            attrs: {
                src: url,
                alt: 'user avatar'
            }
        }
    );
}
