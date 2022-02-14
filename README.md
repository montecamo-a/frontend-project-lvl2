Целью данного проекта является создание утилиты, которая сравнивает два конфигурационных файла (формат файлов - json/yaml).

Утилита принимает через командную строку два аргумента - абсолютные/относительные пути до этих файлов. Результат работы утилиты - разница между двумя файлами.

Форматирование разницы и вычисление разницы отделены.
Вычисленная разница между исходными структурами имеет внутреннее представление - дерево и описывает каждый ключ. Далее форматер работает уже с вычисленной разницей.

В ходе выполнения проекта, созданы три форматера:
- рекурсивный - третья, пятая и шестая аскинема (вывод разницы в виде дерева, где отсутствие плюса или минуса говорит, что ключ есть в обоих файлах, и его значения совпадают. Во всех остальных ситуациях значение по ключу либо отличается, либо ключ есть только в одном файле);

- плоский - седьмая аскинема (вывод разницы в виде текста, отражающего ситуацию, словно первый файл объединили со вторым);

- json.
 
По заданию, в проекте должны отсутствовать:

- переменные и цыклы;

- классы.

### Hexlet tests and linter status:
[![Actions Status](https://github.com/k1ntsugi1/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/k1ntsugi1/frontend-project-lvl2/actions)
### My tests and linter status:
[![tests](https://github.com/k1ntsugi1/frontend-project-lvl2/actions/workflows/tests.yml/badge.svg?event=push)](https://github.com/k1ntsugi1/frontend-project-lvl2/actions/workflows/tests.yml)
### Maintainability Badge:
[![Maintainability](https://api.codeclimate.com/v1/badges/5fcc78e31b3234360ec4/maintainability)](https://codeclimate.com/github/k1ntsugi1/frontend-project-lvl2/maintainability)
### Test Coverage Badge:
[![Test Coverage](https://api.codeclimate.com/v1/badges/5fcc78e31b3234360ec4/test_coverage)](https://codeclimate.com/github/k1ntsugi1/frontend-project-lvl2/test_coverage)
### Third step acsiinema:
<a href="https://asciinema.org/a/ao34sx4DvNO4iRp3mKl5Iytiy" target="_blank"><img src="https://asciinema.org/a/ao34sx4DvNO4iRp3mKl5Iytiy.svg" /></a>
### Fifth step asciinema:
<a href="https://asciinema.org/a/3xkultWMnfHcvjW40d56qLc2k" target="_blank"><img src="https://asciinema.org/a/3xkultWMnfHcvjW40d56qLc2k.svg" /></a>
### Sixth step asciinema:
<a href="https://asciinema.org/a/729tlYSjig6RHm8aIqy10oycn" target="_blank"><img src="https://asciinema.org/a/729tlYSjig6RHm8aIqy10oycn.svg" /></a>
### Seventh step asciinema:
<a href="https://asciinema.org/a/jRMRddhhS5lig7acLXockO4b5" target="_blank"><img src="https://asciinema.org/a/jRMRddhhS5lig7acLXockO4b5.svg" /></a>
### Eight step asciinema:
<a href="https://asciinema.org/a/JrUsEWG8C52OveDH0Vj2ksYVu" target="_blank"><img src="https://asciinema.org/a/JrUsEWG8C52OveDH0Vj2ksYVu.svg" /></a>
