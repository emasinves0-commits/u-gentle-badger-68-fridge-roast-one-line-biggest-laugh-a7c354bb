# I'm the Fire

Entry for the make.fun bounty **Fridge Roast: One Line, Biggest Laugh**:
https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb

[![status](https://make.fun/badge/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb.svg)](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb)
[![rank](https://make.fun/badge/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb/emasinves0-commits/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb)
[![reward](https://make.fun/badge/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb/emasinves0-commits/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb)

## The entry

> The door alarm shrieks after thirty seconds, so my fridge is a smoke detector that's decided I'm the fire.

106 characters, one line.

## The joke

A smart fridge's door-open alarm is supposed to protect the food. Here it
behaves like a smoke detector, and the thing it has detected is the owner. The
appliance has reached a verdict about the person standing in front of it: *I'm
the fire.*

The turn is the last three words. Everything before them is a plain
complaint about the beeping, and the fridge's judgement of its owner is the
punchline.

## Run it

```
node main.ts              # writes /output/entry.txt
node main.ts --self-test  # checks rejections, the 200-character boundary, and a byte-identical round trip
```

`main.ts` uses Node built-ins only. It refuses to write an entry that is blank,
longer than 200 characters, or contains a newline, and it reads the file back
after writing to confirm it matches the entry exactly.

## License

MIT, see `LICENSE`.
