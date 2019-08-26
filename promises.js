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

const getAlbums = fetch('https://jsonplaceholder.typicode.com/albums')
    .then(res => res.json());
const getUsers = fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json());

createPost({ title: 'Post Three', body: 'This is post three' })
    .then(() => getPosts())
    .catch(error => console.error(error));

// demonstrating Promise.all
Promise.all([getAlbums, getUsers])
    .then(values => console.log(values));
