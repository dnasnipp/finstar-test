const GET_USERS_URL = `https://jsonplaceholder.typicode.com/todos`;

type Post = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

type User = {
    id: number,
    posts: Post[]
}

type UsersObject = {
    [key: number]: User
}

type UsersState = {
    users: User[]
}

export const calculateCompletedPosts = (user: User): Post[] => {
    return user.posts.filter(post => {
        return post.completed;
    });
}

export const calculateIncompletedPosts = (user: User): Post[] => {
    return user.posts.filter(post => {
        return !post.completed;
    });
}

export default {
    state: (): UsersState => ({
        users: localStorage.getItem('users') !== null ? JSON.parse(localStorage.getItem('users')!) : []
    }),
    getters: {
        getUsers: (state: UsersState): User[] => {
            return state.users;
        },
        getUsersSortedByCompletedPosts: (state: UsersState): User[] => {
            return state.users.sort((userA: User, userB: User) => {
                const completePostsA = calculateCompletedPosts(userA);
                const completePostsB = calculateCompletedPosts(userB);

                const lengthDiff = completePostsB.length - completePostsA.length;

                return lengthDiff === 0 ? userB.id - userA.id : lengthDiff;
            });
        }
    },
    mutations: {
        setUsersFromPosts: (state: UsersState, posts: Post[]) => {
            state.users = Object.values(
                posts.reduce((acc: UsersObject, post: Post) => {

                    if (acc[post.userId] !== undefined) {
                        acc[post.userId].posts.push(post);
                    } else {
                        acc[post.userId] = {
                            id: post.userId,
                            posts: [post]
                        };
                    }

                    return acc;
                }, {})
            );

            localStorage.setItem('users', JSON.stringify(state.users));
        }
    },
    actions: {
        loadPosts: async (context: any) => {
            try {
                const response = await fetch(GET_USERS_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const json: Post[] = await response.json();

                context.commit('setUsersFromPosts', json);

            } catch (e) {
                console.error(e);
            }
        }
    }
}