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

const next = (iterator, args, prev = undefined) => {
    const { onNext, onError, onComplete } = args;
    const { value, done } = iterator.next(prev);

    if (done) {
        return onComplete();
    }

    if (isPromise(value)) {
        value
            .then(val => {
                onNext(val);
                setTimeout(() => {
                    next(iterator, args, val); // note the use of val
                }, 0);
            })
            .catch(err => onError(err));
    } else {
        onNext(value);
        setTimeout(() => {
            next(iterator, args, value); // note the use of value
        }, 0);
    }
};

// the main wrapper around our promise generators
const generateSync = (fn) => {
    return (...args) => ({
        subscribe: (onNext, onError, onComplete) => {
            next(fn(...args), { onNext, onError, onComplete });
        },
    });
}

// an async task (promise)
const createPost = (post) => new Promise(resolve => {
    setTimeout(() => {
       resolve(post);
    }, 0);
});

const onNext = (val) => {
    posts.push(val);
};
const onError = err => console.error(err);
const onComplete = () => getPosts();

const func = function* () {
    yield createPost({ title: 'Post Three', body: 'This is post three' });
    // other promises could be appended here
};

const init = generateSync(func);

init()
    .subscribe(onNext, onError, onComplete);
