import Vue from 'vue';
import renderImageMessage from '@/components/renderers/image.js';

const { $createElement : h } = new Vue();

describe('/components/renderers/image.js', () => {
    it('image-message vnode render normal data', () => {
        const data =  {
            id: 3,
            type: 'image',
            from_user_id: 'user_2',
            content: {
                url: 'https://gd-filems.dancf.com/mps/mcm79j/mcm79j/99d234c4-34ea-4736-8694-be9cc6606f16.jpg'
            }
        };

        const vnode = renderImageMessage(h, data);
        expect(vnode.tag).toBe('content');
        expect(vnode.data.staticClass).toBe('image-message message-common');
        expect(vnode.children.length).toBe(1);

        const imgNode = vnode.children[0];
        expect(imgNode.tag).toBe('img');
        expect(imgNode.data.staticClass).toBe('image-message__img');
        expect(imgNode.data.domProps.src).toBe(data.content.url);
    });


    it('image-message vnode render with error type', () => {
        const data =  {
            id: 3,
            type: 'text',
            from_user_id: 'user_2',
            content: {
                url: 'https://gd-filems.dancf.com/mps/mcm79j/mcm79j/99d234c4-34ea-4736-8694-be9cc6606f16.jpg'
            }
        };

        const vnode = renderImageMessage(h, data);

        expect(vnode).toBe(null);
    });

    it('image-message vnode render with empty content', () => {
        const data = {
            id: 2,
            type: 'image',
            from_user_id: 'user_0',
            content: {}
        };

        const vnode = renderImageMessage(h, data);

        expect(vnode).toBe(null);
    });
});
