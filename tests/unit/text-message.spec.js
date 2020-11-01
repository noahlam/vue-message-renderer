import Vue from 'vue';
import renderTextMessage from '@/components/renderers/text.js';

const { $createElement : h } = new Vue();

describe('/components/renderers/text.js', () => {
    it('text-message vnode render normal data(other user)', () => {
        const data = {
            id: 1,
            type: 'text',
            from_user_id: 'user_1',
            content: {
                text: '是啊 👏'
            }
        };

        const vnode = renderTextMessage(h, data);
        expect(vnode.tag).toBe('content');
        expect(vnode.data.class).toBeFalsy();
        expect(vnode.data.staticClass).toBe('text-message message-common');
        expect(vnode.children.length).toBe(2);

        const triangleNode = vnode.children[0];
        expect(triangleNode.tag).toBe('aside');
        expect(triangleNode.data.staticClass).toBe('text-message__triangle');

        const contentNode = vnode.children[1];
        expect(contentNode.tag).toBe('span');
        expect(contentNode.data.staticClass).toBe('text-message__content');
        expect(contentNode.data.domProps.innerHTML).toBe(data.content.text);
    });

    it('text-message vnode render normal data(from me)', () => {
        const data = {
            id: 5,
            type: 'text',
            from_user_id: 'me',
            content: {
                text: '是啊 👏'
            }
        };

        const vnode = renderTextMessage(h, data);
        expect(vnode.data.class).toBe('text-message--from-self');
    });

    it('text-message vnode render with error type', () => {
        const data = {
            id: 2,
            type: 'image',
            from_user_id: 'user_0',
            content: {
                text: '是啊 👏'
            }
        };

        const vnode = renderTextMessage(h, data);
        expect(vnode).toBe(null);
    });

    it('text-message vnode render with empty content', () => {
        const data = {
            id: 2,
            type: 'image',
            from_user_id: 'user_0',
            content: {}
        };

        const vnode = renderTextMessage(h, data);
        expect(vnode).toBe(null);
    });
});
