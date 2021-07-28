module.exports = {
  pattern: '^(master|staging|production)$|^(bump|feat|fix|rel(?:ease)?)\/.+$',
  errorMsg: '🤨 The branch you’re trying to push doesn’t match the expected convention, please rename it!',
}