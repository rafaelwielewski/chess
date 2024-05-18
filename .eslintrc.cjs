module.exports = {
  root: true,
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    sourceType: 'module'
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
    jest: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'standard'
  ],
  overrides: [
    {
      files: ['tests/**/*'],
      env: {
        jest: true
      }
    }
  ],
  plugins: ['@typescript-eslint', 'vue'],
  globals: {
    ga: 'readonly',
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  },
  rules: {
    'vue/max-attributes-per-line': 0,
    'vue/valid-v-for': 0,
    'generator-star-spacing': 'off',
    'arrow-parens': 'off',
    'one-var': 'off',
    'no-void': 'off',
    'multiline-ternary': 'off',
    'no-useless-constructor': 'off',
    'no-tabs': 'off',
    'import/first': 'off',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/named': 'off',
    'prefer-promise-reject-errors': 'off',
    quotes: ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-unused-vars': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    semi: ['error', 'always'], // Adicione esta linha
    '@typescript-eslint/indent': ['error', 2],
    indent: 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    curly: 'off',

    'linebreak-style': ['error', 'unix'], // Força o uso de quebras de linha Unix (use 'windows' se estiver em um ambiente Windows)
    'no-trailing-spaces': 'error', // Não permite espaços em branco no final das linhas
    'space-infix-ops': 'error', // Exige espaços ao redor dos operadores
    'comma-spacing': ['error', { before: false, after: true }], // Exige espaço após a vírgula, mas não antes
    'space-before-blocks': 'error', // Exige um ou mais espaços antes das chaves de abertura do bloco
    'keyword-spacing': ['error', { before: true, after: true }], // Exige pelo menos um espaço antes e depois das palavras-chave
    'no-multi-spaces': 'error', // Não permite múltiplos espaços em uma linha
    'space-in-parens': ['error', 'never'], // Não permite espaços dentro de parênteses
    'array-bracket-spacing': ['error', 'never'], // Não permite espaços dentro de colchetes de array
    'object-curly-spacing': ['error', 'always'], // Exige espaços dentro de chaves de objeto
    // 'max-len': ['warn', { code: 150 }], // Limita a largura máxima da linha a 80 caracteres
    'no-console': 'warn', // Adverte sobre o uso de console.log
    eqeqeq: 'error', // Exige o uso de === e !==
    'no-var': 'error', // Não permite o uso de var
    'prefer-const': 'error', // Prefere const quando a variável nunca é reatribuída
    'no-use-before-define': 'error' // Não permite a referência a variáveis antes de serem definidas
  }
};
