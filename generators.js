const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post two' },
];

const getPosts = () => {
    setTimeout(() => {
        let output = '';
        posts.forEach((post) => {
            output += `
                <li>${post.title}</li>
            `;
        });
        document.body.innerHTML = output;
    }, 1000);
};

const isPromise = obj => Boolean(obj) && typeof obj.then === 'function';

const next = (iterator, callback, prev = undefined) => {
    const item = iterator.next(prev);
    const value = item.value;

    if (item.done) {
        return callback(prev);
    }

    if (isPromise(value)) {
        value
            .then(val => {
                setTimeout(() => {
                    next(iterator, callback, val); // note the use of val
                }, 0);
            });
    } else {
        setTimeout(() => {
            next(iterator, callback, value); // note the use of value
        }, 0);
    }
};

// the main wrapper around our promise generators
const generateSync = (fn) => {
    return (...args) => new Promise(resolve => {
        next(fn(...args), val => resolve(val));
    });
}

// an async task (promise)
const createPost = (post) => new Promise(resolve => {
    setTimeout(() => {
       resolve(post);
    }, 0);
})

const init = generateSync(function* () {
    const thirdPost = yield createPost({ title: 'Post Three', body: 'This is post three' });
    posts.push(thirdPost);
    const fourthPost = yield createPost({ title: 'Post Four', body: 'This is post four' });
    posts.push(fourthPost);
    getPosts();
});

init();
