import Vue from 'vue';
import renderSystemMessage from '@/components/renderers/system.js';

const { $createElement: h } = new Vue();

describe('/components/renderers/system.js', () => {
    it('system-message vnode render normal data', () => {
        const data = {
            id: 9,
            type: 'system',
            from_user_id: undefined,
            content: {
                text: '您撤回了一条消息'
            }
        };

        const vnode = renderSystemMessage(h, data);
        expect(vnode.tag).toBe('content');
        expect(vnode.data.staticClass).toBe('system-message message-common');
        expect(vnode.children.length).toBe(1);

        const textNode = vnode.children[0];
        expect(textNode.tag).toBe('span');
        expect(textNode.data.staticClass).toBe('system-message__content');
        expect(textNode.data.domProps.innerHTML).toBe(data.content.text);
    });


    it('system-message vnode render with error type', () => {
        const data = {
            id: 9,
            type: 'text',
            from_user_id: undefined,
            content: {
                text: '您撤回了一条消息'
            }
        };

        const vnode = renderSystemMessage(h, data);
        expect(vnode).toBe(null);
    });

    it('system-message vnode render with empty content', () => {
        const data = {
            id: 9,
            type: 'system',
            from_user_id: undefined,
            content: {
                url: 'http://1.2.3/456'
            }
        };

        const vnode = renderSystemMessage(h, data);
        expect(vnode).toBe(null);
    });
});
