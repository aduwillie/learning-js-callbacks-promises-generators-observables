const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post two' },
];

const getPosts = () => {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `
                <li>${post.title}</li>
            `;
        });
        document.body.innerHTML = output;
    }, 1000);
};

const createPost = (post) => {
    return new Promise((resolve) => {
        posts.push(post);
        resolve();
    });
};

const init = async () => {
    await createPost({ title: 'Post Three', body: 'This is post three' });
    getPosts();
};
init(); // async functions at the root are just called like that
