import Vue from 'vue';
import renderAvatar from '@/components/avatar.js';

const { $createElement : h } = new Vue();

describe('/components/avatar.js', () => {
    it('avatar vnode render', () => {
        const url = 'http://abc.def.ghi/jkl.mn';
        const vnode = renderAvatar(h, url);
        expect(vnode.tag).toBe('img');
        expect(vnode.data.staticClass).toBe('message-avatar');
        expect(vnode.data.attrs.src).toBe(url);
        expect(vnode.data.attrs.alt).toBe('user avatar');
    });
});
