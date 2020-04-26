## Основное соглашение по коммитам

> Данное соглашение представляет собой адаптированный вариант соглашения: [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

> Данное соглашение совместимо с [SemVer](https://semver.org/), описывая новые функции (`features`), исправления (`fixes`) и изменения, нарушающие обратную совместимость (**`BREAKING CHANGE`**) в сообщениях _commit’ов_.

#### TL;DR:

Коммиты должны соответствовать регулярному выражению:

```js
/^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|build)(\(.+\))?: .{1,50}/;
```

### Формат коммита:

<p>
  Коммит состоит из <strong>header</strong>, <strong>body</strong> и <strong>footer</strong>.<br>
  Заголовок (<code>header</code>) состоит из типа 
  <strong><code>type</code></strong>, области 
  <strong><code>scope</code></strong> и темы 
  <strong><code>subject</code></strong>.
</p>

<blockquote>
  <p>
    <code>header&lt;type(scope): subject&gt;</code><br>
    <strong>пустая строка</strong><br>
    <code>body</code><br>
    <strong>пустая строка</strong><br>
    <code>footer</code>
  </p>
</blockquote>

1. _Commit’ы_ **должны** начинаться с типа, который является существительным: `feat, fix, и т.д.`, за которым следуют не обязательное указание контекста (`scope`), двоеточие и пробел.
2. Тип `feat` **должен** использоваться, когда _commit_ добавляет новый функционал (`feature`) в ваше приложение или библиотеку.
3. Тип `fix` **должен** использоваться, когда _commit_ исправляет ошибку (`fix`) в вашем приложении или библиотеке.
4. Контекст (`scope`) может следовать после типа. Контекст **должен** быть существительным, заключенным в круглые скобки, описывающий часть кодовой базы, которую затронул _commit_. Например, `fix(parser):`.
5. Описание **должно** следовать через пробел сразу же после типа/контекста. Описание - это краткая выжимка об изменениях кода, например, `fix: array parsing issue when multiple spaces were contained in string`.
6. Тело (`body`) _commit’а_ может следовать после короткого описания, добавляя дополнительную информацию об изменениях в коде. Тело **должно** отделяться от короткого описания одной пустой строкой.
7. Подвал (`footer`) может быть представлен одной или несколькими строками после тела _commit’а_. Он должен быть отделен от тела _commit’а_ одной пустой строкой. Подвал **должен** содержать мета-информацию о _commit’е_. Например, связанные `pull-request’ы`, обсуждения, изменения, нарушающие обратную совместимость. По одной мета-информации на строку.
8. Изменения, нарушающие обратную совместимость (`breaking changes`), **должны** быть указаны в самом начале тела (`body`) или в начале одной из строк подвала (`footer`). Изменения, нарушающие обратную совместимость, **должны** начинаться с текста, написанного прописными буквами, **`BREAKING CHANGE:`**, за которым должны следовать двоеточие и пробел.
9. Описание изменений, нарушающий обратную совместимость, **должно** следовать после **`BREAKING CHANGE:`**. В нем должно содержаться то, что изменилось в API. Например, **`BREAKING CHANGE:`** `environment variables now take precedence over config files`.

### Revert - отмена предыдущего коммита

Если коммит отменяет изменения предыдущего коммита, он должен начинаться с `revert:`, за которым следует заголовок (`header`) отменяемого коммита.
В теле (`body`) должно быть указано: `This reverts commit <hash> .`, где хэш (`hash`) - это SHA отменяемого коммита.

### Основные типы коммитов:

- **feat**: Добавляет новую функцию (`features`) в код (он соответствует **`MINOR`** в [SemVer](https://semver.org/#summary)).

###### Тип изменения **`Features`**, область взаимодействия (`component`):

```
feat(component): add 'comments' prop
```

```
feat(zone.js): support Promice.allSettled #31849
feat(ivy): resolve references to vars in .d.ts files #25775
feat(aio): implement GithubTeams
feat(facade): add bool type
feat(forms): add modifier reset in el-form that resets state on submit
feat(Parser): improve error handling
feat(bazel): add additional parameters to api_guardian #25694
feat(forms): add el-pending CSS class async validation #11243
```

- **fix**: Исправляет ошибку (`bug fixes`) в вашем коде (он соответствует **`PATCH`** в [SemVer](https://semver.org/#summary))

```
fix(ivy): correctly resolve shorthand property declarations #28936
fix(bazel): incorrectly always uses el-wrapped #28137
fix(di): injecting null causes a cyclic dependency
fix(ivy): not throwing error for unknown properties #29691
fix(router): make router provides work with cli and offline
fix(forms): avoid producting an error with hostBindingTypeCheck
```

_Commit_, который содержит текст **`BREAKING CHANGE:`** в начале **не обязательного** тела сообщения (`body`) или подвале (`footer`), описывает изменения, нарушающие обратную совместимость вашего API (он соответствует **`MAJOR`** в [SemVer](https://semver.org/#summary)). **`BREAKING CHANGE`** и может быть частью _commit’а_ любого типа.

### Так же допускаются типы:

Типы которые так же рекомендуеется использовать в рамках этого соглашения: `polish`, `docs`, `style`, `refactor`, `perf`, `test`, `workflow`, `ci` `chore`, `build`, `revert` эти типы как правило не связанны с трекером задач.

- **polish**: --

```
polish: add warning when .native modifier is used on native HTML el
polish: improve template compiler version mismatch warning
polish: warn against incorrect nested v-slot usage
polish: improve invalid method warning with type info
polish: warn duplicate keys when patching children into empty node
```

- **docs**: Изменене в документации
- **style**: Изменение которое связано со стилями и не влияеющие на логику кода

```
style(aio): add space between .home and .hamburger #23624
style(bazel): fix 2 unformatted .bzl files
style(core): fix max line length to pass linting #20441
style(modeTree): fix formatting
style(compiler): fix lint issues #23480
style(aio): fix indentation on location service spec
style(changelog): improving read ability #18949
style(playground): use single quotes consistently
```

- **refactor**: Изменение которое не исправляет ошибку и не добавляет функцию
- **perf**: Изменение которое улучшает производительность

###### Тип изменения **`Performance Improvements`**, область взаимодействия `core` с критической пометкой **`BREAKING CHANGE`** и описанием изменений нарушающих обратную совместимость:

```
perf(core): improve vdom diffing by removing 'foo' option

BREAKING CHANGE: The 'foo' option has been removed.
```

> P.S: т.к удаление опции `foo` из ядра/архитектуры приложения может стать критичным для компонентов которые продолжают его использовать стоит дополнить **footer** коммита важным анонсом `BREAKING CHANGE`. Стоит так же понимать что удалять напрямую зависимость из проекта не самая лучшая мысль, лучше обьявить о её удалении заранее маркером `deprecated` и произвести отчистку в следующей **major** версий.

```
perf: skip scoped slots normalization when possible
perf: cache result from functional ctx.slots() calls
```

- **test**: Добавление недостающих тестов или исправление существующих
- **workflow**: Изменение рабочего процесса
- **ci**: Используется для указаний изменений в разработке, связанных с системой интеграции и развертывания, включая сценарии, конфигурации или инструменты

```
ci: pin webpack version
```

- **chore**: Обновление без изменений логики основного кода, как правило не попадающие в релизную версию

```
chore: typo in comment
chore: typo in variable name
chore: fix flow
chore: fix typo in `next-tick.js` comment
chore: fix typo in <template v-slot> warning
chore: use png for main logo
chore: remove unused build alias
chore: fix e2e test in phantomjs
chore: make documentation clearer
chore: update deps
chore(benchmarks): use flex-wrap #10380
chore(typo): fix README tag mismatch
chore: fix tag name in compiler/parser/index.js
```

- **build**: Изменения которые влияют на сборку или внешние зависимости (example `scopes`: gulp, broccoli, npm)
- **revert**: Откат/Отмена предыдущих изменений

> Следующий коммит отменяет изменения предыдущего комиита `667ecc1` и если информация о нем попадает в журнал истории то коммит повторяет заголовок отменяемого и оборачивается в дополнительный заголовок с типом изменения (`Reverts`).

```
revert: feat(compiler): add 'comments' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

### Область/Сфера (`scope`)

Область действия может быть любой, определяющей место изменения. Например, `core`, `compiler`, `ssr`, `v-model`, `transition` и т.д.

### Тема (`subject`)

Тема содержит краткое описание изменения:

- используйте императив в настоящем времени: «change», а не «changed» или «changes»
- не пишите с заглавной буквы
- не ставьте точку (.) на конце

### Тело (`body`) - _не обязательно `optional`_

Как и в теме (`subject`), используйте императив в настоящем времени: «change», а не «changed» или «changes».
Тело **должно** описывать более детально об изменении.

### Подвал (`footer`) - _не обязательно `optional`_

**Должен** содержать любую информацию о **`BREAKING CHANGE:`**, можно указать автора, а также место для ссылок на issue или трекер задач, которые закрывают этот коммит.
