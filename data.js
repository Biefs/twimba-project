export const tweetsData = [   
    {
        handle: `@TrollBot667 ๐`,
        profilePic: new URL(`images/troll.jpg`, import.meta.url),
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make ๐ฐ๐ฐ๐ฐ low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },    
    {
        handle: `@Elon โ`,
        profilePic: new URL(`images/musk.png`, import.meta.url),
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars ๐ช. No experience necessary๐`,
        replies: [
                  {
                handle: `@TomCruise โ`,
                profilePic: new URL(`images/tcruise.png`, import.meta.url),
                tweetText: `Yes! Sign me up! ๐๐ฉ`,
            },
                  {
                handle: `@ChuckNorris โ`,
                profilePic: new URL(`images/chucknorris.jpeg`, import.meta.url),
                tweetText: `I went last year๐ด`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
        {
        handle: `@NoobCoder12`,
        profilePic: new URL(`images/flower.png`, import.meta.url),
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower โฃ๏ธ`,
                profilePic: new URL(`images/overflow.png`, import.meta.url),
                tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
            },
            {
                handle: `@YummyCoder64`,
                profilePic: new URL(`images/love.png`, import.meta.url),
                tweetText: `You are wonderful just as you are! โค๏ธ`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },     
]