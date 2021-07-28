module.exports = {
  display: {
    notifications: true,
    offendingContent: true,
    rulesSummary: false,
    shortStats: true,
    verbose: false,
  },
  rules: [
    {
      message: 'You’ve got leftover conflict markers',
      regex: /^[<>|=]{4,}/m,
    },
    {
      message: 'Discontinued because something should not be committed!',
      regex: /do not commit/i,
    },
    {
      message: 'You have unfinished devs',
      nonBlocking: true,
      regex: /(?:FIXME|TODO)/,
    },
    {
      message: 'You’ve got leftover forced `true` conditions',
      regex: /if\s+\(?(?:.*\|\|\s*)?true\)?/,
    },
    // JS specific
    {
      filter: /\.js$/,
      message:
        '😫 Damnit! Auto-imports failed with Material-UI components or styles',
      regex: /^import \{ .* \} from '@material-ui\//,
    },
    {
      filter: /\.js$/,
      message:
        '🤔 Hum! Did you forget to remove some logs?',
      nonBlocking: true,
      regex: /^\s*console\.log/,
    },
    // Ruby/Rails specific
    {
      filter: /_spec\.rb$/,
      message: 'Your RSpec test suite is trimmed down by `focus` tags',
      regex: /(?:focus: true|:focus => true)/,
    },
    {
      filter: /_spec\.rb$/,
      message:
        'Your Ruby tests seems to have an active `save_and_open_page` call',
      regex: /save_and_open_page/,
    },
    {
      filter: /\.rb$/,
      message: 'Your Ruby file seems to have an active `binding.pry` call',
      regex: /^[^#]*\bbinding\.pry/,
    },
  ],
}