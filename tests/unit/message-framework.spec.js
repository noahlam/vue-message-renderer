import Vue from 'vue';
import { mount } from '@vue/test-utils'
import MessageFramework from '@/components/message-framework.js';

const { $createElement: h } = new Vue();


describe('/components/message-framework.js', () => {
    it('renders text message', () => {
        const data = {
            id: 1,
            type: 'text',
            from_user_id: 'user_1',
            content: {
                text: '是啊 👏'
            }
        };

        const messageFramework = mount(MessageFramework, {
            propsData: {
                data
            }
        });

        const { isFunctionalComponent, element } = messageFramework;

        expect(isFunctionalComponent).toBeTruthy();

        expect(element.tagName.toUpperCase()).toBe('SECTION');
        expect(element.className).toBe('message-box');
        expect(element.childNodes.length).toBe(2);

        expect(element.childNodes[0].className).toBe('message-avatar');
        expect(element.childNodes[1].className).toBe('text-message message-common');
    });

    it('renders image message', () => {
        const data = {
            id: 3,
            type: 'image',
            from_user_id: 'user_2',
            content: {
                url: 'https://gd-filems.dancf.com/mps/mcm79j/mcm79j/99d234c4-34ea-4736-8694-be9cc6606f16.jpg'
            }
        };

        const messageFramework = mount(MessageFramework, {
            propsData: {
                data
            }
        });

        const { element } = messageFramework;

        expect(element.childNodes.length).toBe(2);
        expect(element.childNodes[0].className).toBe('message-avatar');
        expect(element.childNodes[1].className).toBe('image-message message-common');
    });

    it('renders system message', () => {
        const data = {
            id: 5,
            type: 'system',
            from_user_id: undefined,
            content: {
                text: '您撤回了一条消息'
            }
        };

        const messageFramework = mount(MessageFramework, {
            propsData: {
                data
            }
        });

        const { element } = messageFramework;

        expect(element.childNodes.length).toBe(1);
        expect(element.childNodes[0].className).toBe('system-message message-common');
    });

    it('customelize system message renderer', () => {
        const data = {
            id: 5,
            type: 'system',
            from_user_id: undefined,
            content: {
                text: '您撤回了一条消息'
            }
        };

        const messageFramework = mount(MessageFramework, {
            propsData: {
                data,
                renderers: {
                    system(h) {
                        return h('table', '');
                    }
                }
            }
        });

        const { element } = messageFramework;
        expect(element.childNodes[0].tagName.toUpperCase()).toBe('TABLE');
    });

    it('customelize image message renderer', () => {
        const data = {
            id: 5,
            type: 'image',
            from_user_id: 'user_1',
            content: {
                url: 'http:1.2.3/456'
            }
        };

        const messageFramework = mount(MessageFramework, {
            propsData: {
                data,
                renderers: {
                    image(h) {
                        return h('table', '');
                    }
                }
            }
        });

        const { element } = messageFramework;
        expect(element.childNodes[1].tagName.toUpperCase()).toBe('TABLE');
    });

    it('customelize text message renderer', () => {
        const data = {
            id: 1,
            type: 'text',
            from_user_id: 'user_1',
            content: {
                text: '是啊 👏'
            }
        };

        const messageFramework = mount(MessageFramework, {
            propsData: {
                data,
                renderers: {
                    text(h) {
                        return h('table', '');
                    }
                }
            }
        });

        const { element } = messageFramework;
        expect(element.childNodes[1].tagName.toUpperCase()).toBe('TABLE');
    });

    it('process message data before renderer', () => {
        const data = {
            id: 1,
            type: 'text',
            from_user_id: 'user_1',
            content: {
                text: '是啊 👏'
            }
        };

        const messageFramework = mount(MessageFramework, {
            propsData: {
                data,
                renderHooks: {
                    beforeRender(data) {
                        data.type = 'image';
                        return data;
                    }
                }
            }
        });

        const { element } = messageFramework;
        expect(element.childNodes.length).toBe(1);
    });

    it('process vnode data after renderer', () => {
        const data = {
            id: 1,
            type: 'text',
            from_user_id: 'user_1',
            content: {
                text: '是啊 👏'
            }
        };

        const messageFramework = mount(MessageFramework, {
            propsData: {
                data,
                renderHooks: {
                    afterRenderer(vnode) {
                        vnode.children.length = 0;
                        return vnode;
                    }
                }
            }
        });

        const { element } = messageFramework;
        expect(element.childNodes.length).toBe(0);
    });
});
