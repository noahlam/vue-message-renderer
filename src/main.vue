<template>
    <div id="app">
        <DynamicScroller
            class="chat-message-board"
            :items="messagesData"
            :min-item-size="200"
        >
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem :item="item" :active="active" :data-index="index">
                    <Message :data="item" />
                </DynamicScrollerItem>
            </template>
        </DynamicScroller>
    </div>
</template>

<script>
import { messagesData } from './data/mock-data.js';
import Message from './components/message.js';

export default {
    name: 'Main',
    components: {
        Message
    },
    data() {
        return {
            messagesData
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
