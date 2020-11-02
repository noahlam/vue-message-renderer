## 消息渲染器
一个基于 vue 2.x 的类微信消息渲染器

### 安装依赖

部分 nodejs 版本在安装依赖的时候, 会出现无法安装的情况

yarn:

```
info fsevents@2.1.3: The engine "node" is incompatible with this module. Expected version "^8.16.0 || ^10.6.0 || >=11.0.0". Got "10.0.0"
info "fsevents@2.1.3" is an optional dependency and failed compatibility check. Excluding it from installation.
error eslint@6.8.0: The engine "node" is incompatible with this module. Expected version "^8.10.0 || ^10.13.0 || >=11.10.1". Got "10.0.0"
error Found incompatible module
```

yarn 可以看到需要提示里面指定的 node 版本, 而 npm 得不到有用的错误信息, 所以建议用 yarn 安装依赖

### 用法
默认情况下, 直接引入 message 组件, 传入需要渲染的数据, 即可
```
<tenmplate>
    <Message :data="messageData" />
</template>

<script>
import Message from './components/message.js';
export default {
    components: {
        Message,
    },
    data() {
        return {
            messageData: {
                id: 2,
                type: 'text',
                from_user_id: 'me',
                content: {
                    text: '好像还真的是 😂'
                }
            }
        };
    }
};
</script>
```

上述用法, 是调用内置的消息渲染器渲染, 如果你对这个渲染结果不满意, 可以自定义渲染器
```
<tenmplate>
    <Message :data="messageData" :renderers="renderers"/>
</template>

<script>
import Message from './components/message.js';
export default {
    components: {
        Message,
    },
    data() {
        return {
            messageData: {
                id: 2,
                type: 'text',
                from_user_id: 'me',
                content: {
                    text: '好像还真的是 😂'
                }
            },
             renderers: {
                text(h, data) {
                    return h('span', '我是自定义渲染的内容');
                }
             },
        };
    }
};
</script>
```
上面传入了一个文本的自定义渲染器, 直接替换了文本消息的渲染方式.

其他渲染器同理, 渲染器名称与 message.type 一致.自定义消息渲染器会接收两个参数
1. h Vue 的渲染函数 $createElement
1. data 待渲染数据


除了各个消息的渲染器以外, 还提供了一个 `主渲染器` 的定制, 原理与用法同上面一致,
也是放在 renderers 对象下, 名称是 mainRenderer, 接收三个参数, 分别是
1. h Vue 的渲染函数 $createElement
1. data 待渲染数据
1. renderers 自定义渲染器

```
<tenmplate>
    <Message :data="messageData" :renderers="renderers"/>
</template>

<script>
import Message from './components/message.js';
export default {
    components: {
        Message,
    },
    data() {
        return {
            messageData: {
                id: 2,
                type: 'text',
                from_user_id: 'me',
                content: {
                    text: '好像还真的是 😂'
                }
            },
            renderers: {
                mainRenderer(h, data, renderers) {
                    return h('div', '这是自定义渲染消息')
                }
            },
        };
    }
};
</script>
```

除了自定义渲染器外, 是提供了两个渲染事件钩子 `beforeRender` 和 `afterRenderer` 分别用来处理主渲染器在 `渲染前` 和 `渲染后` 的事件回调

```
<tenmplate>
    <Message :data="messageData" :renderHooks="renderHooks"/>
</template>

<script>
import Message from './components/message.js';
export default {
    components: {
        Message,
    },
    data() {
        return {
            messageData: {
                id: 2,
                type: 'text',
                from_user_id: 'me',
                content: {
                    text: '好像还真的是 😂'
                }
            },
            renderHooks: {
                beforeRender(data) {
                    console.log('before render data: ', data);
                    return data;
                },
                afterRenderer(vnode) {
                    console.log('rendered node', vnode);
                    return vnode;
                }
            }
        };
    }
};
</script>
```
⚠️在渲染器内部会去拿事件钩子返回的数据来进行下一步操作,
所以钩子必须要有与入参相类型的返回值

⚠️自定义渲染器也会经过事件钩子处理, 一般情况下, 你对自定义渲染器拥有绝对的控制权, 无需其他钩子.

所以如果两者同时存在的话, 请自行确认必要性.

### 方案概述

一条消息的渲染, 会先经过 `主渲染器` 渲染公共部分,
在主渲染器内部, 还会经过两个事件钩子.
然后再根据特定的类型, 加载对应类型的消息渲染器.

![./public/MessageRenderer.png]('./public/MessageRenderer.png')

消息类型渲染器对动态去读取 放在 @/components/renderers 目录下, 与消息类型同名的 .js 文件
目前仅支持 text, image, system 三种类型消息, 如需新增类型支持, 可以自行扩展.

另一个支持新消息的行的方式是传入自定义消息渲染器

```
renderers: {
    newMessaeType(h, data) {
        // 渲染逻辑
    }
},
```

### 已知问题

滚动列表偶现高度计算不准确导致邻近两条消息粘合在一起的情况, 由于时间关系, 目前暂未解决
