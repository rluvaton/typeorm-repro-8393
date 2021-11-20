import { createConnection } from 'typeorm';
import { Post } from './entity/Post';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// connection settings are in the "ormconfig.js" file
async function run() {
  const connection = await createConnection();

  const post = new Post();
  post.title = 'Control flow based type analysis';
  post.readOnlyColumn = 1;

  await connection.manager.save(post);

  console.log('Post has been saved: ', post);

  await sleep(1000);

  await connection.manager.update(Post, post.id, {
    // Make a change to read only column
    readOnlyColumn: 2,
  });

  const updatedPost = await connection.manager.findOne(Post, post.id);

  console.log('Updated post: ', updatedPost);

  console.table([post, updatedPost]);

  // Gonna be true - not changed
  console.assert(post.readOnlyColumn === updatedPost.readOnlyColumn, '\x1b[31mRead only column updated\x1b[0m');

  // Gonna be false
  console.assert(post.lastUpdated.getTime() === updatedPost.lastUpdated.getTime(), '\x1b[31mPosts last updated are different\x1b[0m');

  await connection.close();
}

run();
