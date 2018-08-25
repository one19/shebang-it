# shebang-it

### What is it?
<details>
  <summary>
    tl;dr: tiny util that shebangs your bundled file
  </summary>
  <br />

  Maybe I'm missing something, but it seems like the offerings of `parcel-bundler`, and `webpack` are missing a crucial lib to do with the usability of bundled command line utilites:

  You need to be able to *actually run them.*

  So, I wrote a tiny util to take a bundled `js` file, slap a shebang on top, move it into a bin folder, and give it executable perms. I've been passing this around a few of my `cli` util projects for a while, and figured it was high time to make it official. So now it is!

</details>
<br/>

### How to use it?
<details>
  <summary>
    tl;dr: <code>yarn add -D shebang-it && npx shebang-it</code>
  </summary>
  <br />

  `shebang-it` takes a single argument: the folder path to the file you'd like made executable, and it defaults to `dist`

  it can also take the following optional properties if you want to get creative with creating tons of different `bin` files:

  | Arg | Longform | Description | Example |
| :---------------: | :---------------: | :--------------- | ---------------: |
| **-i** | --input-filename | custom filename for the assumed `dist` util | `shebang-it -i windex.js` |
| **-o** | --output-filename | custom filename for the output `bin` util | `shebang-it -o shebang-it.js` |

As part of my build process with `husky` and `lint-staged`, I like generating the files automatically. That way, in a precommit, the `bin` file will always be up to date, and when using the `np` library to push updates to `npm` there won't be anything to blame for the right code not landing.

</details>
<br/>

### TODO:
<details>
<summary>tl;dr: <strong>Mostly dev cleanup</strong></summary>
<br />

1. add it to project-status
2. generate a couple badges
3. add it to travis-ci
4. report coverage
5. report test percentage
6. report code quality
7. add option for silent execution

</details>
<br/>