/*
6. Social Network Simulation
Create a mini social network simulation using Node.js and Object-Oriented
Programming principles. This is a backend-only, in-memory simulation — do not
use any external libraries, databases, or file system.

Functional Requirements:
1. User Functionality
● Create 10 users with randomly generated usernames.
● Each user should have:
○ id (auto-increment or UUID)
○ username

2. Post Functionality
● Each user can create 1 random post (total 10 posts).
● Each post should include:
○ id (auto-increment or UUID)
○ content (random sentence)
○ author (User object)
○ likes: array of User objects who liked the post
○ comments: array of Comment objects

3. Interaction Simulation
● Random users should:
○ Like random posts (not their own).
○ Comment on random posts (not their own).
● Comment structure:
○ id
○ commenter: User object
○ text: random comment string

4. Display Output
● Display the list of all users.
● For each user, show:
○ Their posts
○ Each post’s likes (usernames)
○ Each post’s comments (usernames + comment text)
○ createdAt
*/


class User {
    static idGen = 1;
    constructor(username) {
        this.id = User.idGen++;
        this.name = username;
    }
}

class Post {
    static idGen = 1;
    constructor(content, author) {
        this.id = Post.idGen++;
        this.content = content;
        this.author = author;
        this.likes = [];
        this.comments = [];
        this.createdAt = new Date();
    }

    like(user) {
        if (user.id != this.author.id) {
            this.likes.push(user)
        }
    }

    comment(comment) {
        if (comment.commenter.id != this.author.id) {
            this.comments.push(comment);
        }
    }

}


class Comment {
    static idGen = 1;
    constructor(commenter, text) {
        this.id = Comment.idGen++;
        this.commenter = commenter;
        this.text = text;
    }
}

const randomUsernames = [
    'SkyWalker', 'NeoZone', 'QuantumKid', 'PixelPenguin', 'CaffeineCode',
    'FrostByte', 'EchoStorm', 'BlazeByte', 'NovaDash', 'CodeCrusader'
];

const randomSentences = [
    'This is my first post!', 'Hello, world!', 'Just chilling today.', 'Learning Node.js is fun!',
    'Feeling grateful.', 'Who else loves coding?', 'Random thoughts.', 'Express yourself!',
    'One post at a time.', 'Building something amazing!'
];

const randomComments = [
    'Nice post!', 'Interesting thought.', 'Totally agree.', 'Loved this.', 'Keep it up!',
    'Well said!', 'Haha true!', 'Insightful.', 'Cool!', 'Great perspective!'
];


const users = randomUsernames.map((val) => new User(val));

const posts = users.map((val, ind) => new Post(randomSentences[ind], val));

users.forEach(user => {
    const postToLike = posts[Math.floor(Math.random() * posts.length)];
    if (postToLike.author.id !== user.id) postToLike.like(user);

    const postToComment = posts[Math.floor(Math.random() * posts.length)];
    if (postToComment.author.id !== user.id) {
        const commentText = randomComments[Math.floor(Math.random() * randomComments.length)];
        const comment = new Comment(user, commentText);
        postToComment.comment(comment);
    }
});



const displayThings = () => {
    console.log('\n=== All Users ===');
    users.forEach(user => {
        console.log(`- ${user.name} (ID: ${user.id})`);
    });

    console.log('\n=== User Posts, Likes & Comments ===');
    users.forEach(user => {
        console.log(`\nUser: ${user.name}`);
        const userPosts = posts.filter(post => post.author.id === user.id);
        userPosts.forEach(post => {
            console.log(`\n  Post ID: ${post.id}`);
            console.log(`  Content: ${post.content}`);
            console.log(`  Created At: ${post.createdAt.toLocaleString()}`);

            const likeUsernames = post.likes.map(u => u.username);
            console.log(`  Likes (${likeUsernames.length}): ${likeUsernames.join(', ')}`);

            console.log(`  Comments (${post.comments.length}):`);
            post.comments.forEach(comment => {
                console.log(`    - ${comment.commenter.name}: ${comment.text}`);
            });
        });
    });
}


displayThings();