import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const localData = JSON.parse(localStorage.getItem('tweetsData')) || tweetsData





document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    } else if (e.target.dataset.deleteBtn){
        handleDeleteTweetClick(e.target.dataset.deleteBtn)
    } else if (e.target.dataset.replyBtn){
        handleReplyInputClick(e.target.dataset.replyBtn)
    } else if (e.target.dataset.deleteReplyBtn){
        handleDeleteReplyClick(e.target.dataset.deleteReplyBtn)
    }
})
 


function handleLikeClick(tweetId){ 
    const targetTweetObj = localData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = localData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    if(!tweetInput.value) {return}
        localData.unshift({
            handle: `@Scrimba`,
            profilePic: new URL(`images/scrimbalogo.png`, import.meta.url),
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            isMyTweet: true,
            uuid: uuidv4()
        })
    
    tweetInput.value = ''
    render()
}


function handleDeleteTweetClick(tweetId){
   localData.splice(localData.findIndex(tweet => tweet.uuid === tweetId), 1)  
    render()
}


function handleDeleteReplyClick(replyId){
    localData.forEach(tweet => {
      return tweet.replies.splice(tweet.replies.findIndex(reply => reply.id === replyId), 1)
    })
    render()
 }

function handleReplyInputClick(tweetId){
    const replyInput = document.querySelector(`[data-text-reply="${tweetId}"]`)
    const targetTweetObj = localData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(replyInput.value){
        if(targetTweetObj){
        targetTweetObj.replies.push({
            handle: `@Scrimba`,
            profilePic: new URL(`images/scrimbalogo.png`, import.meta.url),
            tweetText: replyInput.value,
            isMyReply: true,
            id: uuidv4()
        })
    }}
    
    render()
    document.getElementById(`replies-${tweetId}`).classList.remove('hidden')
}





function getFeedHtml(){
    let feedHtml = ``
    
    localData.forEach(function(tweet){
        
        let likeIconClass = ''
        let deleteTweetBtn = ''
        let deleteReplyBtn = ''

        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        
        if(tweet.isSelected){
            selectedClass = 'selected'
        }
        
        let repliesHtml = ''
        
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                if(reply.isMyReply){
                    deleteReplyBtn = `
                    <span class="delete-btn" data-delete-reply-btn="${reply.id}">Delete tweet</span>
                    `
                } else deleteReplyBtn = ``

                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <div class="container">
                <p class="handle">${reply.handle}</p>
                ${deleteReplyBtn}
                </div>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }
        
        if(tweet.isMyTweet){
            deleteTweetBtn = `
            <span class="delete-btn" data-delete-btn="${tweet.uuid}">Delete tweet</span>
            `
        } else deleteTweetBtn = ``
          
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
        <div class="container">
            <p class="handle" >${tweet.handle}</p>
            ${deleteTweetBtn}
        </div>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
        <div class="reply-input-area">
			<img src="${new URL(`images/scrimbalogo.png`, import.meta.url)}" class="profile-pic">
			<textarea data-text-reply="${tweet.uuid}" placeholder="Tweet your reply" class="reply-input"></textarea>
            <button data-reply-btn="${tweet.uuid}" class="reply-btn">Reply</button>
		</div>
    </div>   
</div>
`
   })
   return feedHtml 
}


function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
    localStorage.setItem('tweetsData', JSON.stringify(localData))
}


render()

