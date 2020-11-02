<template>
    <div id="app">
        <DynamicScroller
            class="chat-message-board"
            :items="messagesData"
            :min-item-size="200"
        >
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem :item="item" :active="active" :data-index="index">
                    <Message
                        :data="item"
                        :renderers="renderers"
                        :renderHooks="renderHooks"
                    />
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>

<script>
import { messagesData } from './data/mock-data.js';
import Message from './components/message-framework.js';

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

export default {
    name: 'Main',
    components: {
        Message,
        DynamicScroller,
        DynamicScrollerItem,
    },
    data() {
        return {
            messagesData,
            /**
             * 自定义渲染器
             * @property { function } mainRenderer 主渲染器
             * @property { function } 各个类型的消息渲染器, 与 message.type 同名
             * @example
             * renderers:{
             *     mainRenderer(h, data, renderers) {},
             *     text(h, data) {},
             *     image(h, data) {},
             *     system(h, data) {},
             * }
             */
            renderers: {

            },

            /**
             * 渲染钩子
             * @property { function } beforeRender 前置钩子
             * @property { function } afterRenderer 后置钩子
             */
            renderHooks: {
                /**
                 * 拦截并返回一个新的渲染前数据
                 * @param { Object } data 渲染数据
                 * @return { Object } 新的 data
                 */
                beforeRender(data) {
                    // console.log('before render data: ', data);
                    return data;
                },
                /**
                 * 拦截并返回一个新的渲染结果
                 * @param { Object } vnode
                 * @return { Object } 新的 vnode 数据
                 */
                afterRenderer(vnode) {
                    // console.log('rendered node', vnode);
                    return vnode;
                }
            }
        };
    }
};
</script>

<style>
@import './styles/common.css';
@import './styles/avatar.css';
@import './styles/text-message.css';
@import './styles/image-message.css';
@import './styles/system-message.css';
</style>
