/**
 * 模拟消息数据
 */
const messagesDataSample = [
    {
        id: 1,
        type: 'text',
        from_user_id: 'user_1',
        content: {
            text: '是啊 👏'
        }
    },
    {
        id: 2,
        type: 'text',
        from_user_id: 'me',
        content: {
            text: '好像还真的是 😂'
        }
    },
    {
        id: 3,
        type: 'image',
        from_user_id: 'user_2',
        content: {
            url: 'https://gd-filems.dancf.com/mps/mcm79j/mcm79j/99d234c4-34ea-4736-8694-be9cc6606f16.jpg'
        }
    },
    {
        id: 4,
        type: 'image',
        from_user_id: 'me',
        content: {
            url: 'https://gd-filems.dancf.com/mps/mcm79j/mcm79j/07bedcda-967a-4201-a690-711a984f681d.png'
        }
    },
    {
        id: 5,
        type: 'system',
        from_user_id: undefined,
        content: {
            text: '您撤回了一条消息'
        }
    },
    {
        id: 6,
        type: 'image',
        from_user_id: 'user_3',
        content: {
            url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3881112385,3960841443&fm=26&gp=0.jpg'
        }
    }
];


export const messagesData = new Array(1000).fill().map((_, id) => {
    return {
        ...messagesDataSample[id % 6],
        id,
    };
});

/**
 * 模拟头像缓存
 */
export const avatarCache = {
    'me': 'https://gd-filems.dancf.com/mps/mcm79j/mcm79j/c52d1fc3-3867-4a33-b83e-e00b067185b4.jpg',
    'user_1': 'https://gd-filems.dancf.com/mps/mcm79j/mcm79j/45d3ae4d-9a9f-4b95-8798-3b945467f732.jpg',
    'user_2': 'https://gd-filems.dancf.com/mps/mcm79j/mcm79j/bed36541-f0b5-4e27-9161-f79939c2080c.jpg',
    'user_3': 'https://gd-filems.dancf.com/mps/mcm79j/mcm79j/d0b0dac6-a3d5-4cad-b114-38932bfc2ff5.jpg'
};

export function getAvatarByUserId(id) {
    return avatarCache[id];
}
