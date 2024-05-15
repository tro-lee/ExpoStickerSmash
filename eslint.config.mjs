import antfu from '@antfu/eslint-config'

export default antfu({
}, {
  rules: {
    'curly': ['off'],
    'no-console': ['off'],
    'no-alert': ['off'],
    'ts/no-require-imports': ['off'],
    'ts/no-use-before-define': ['off'],
  },
})
