## 타입스크립트 props 제한해주기

```jsx
type RandomNumberType = {
  value: number
}

type PositiveNumber = RandomNumberType & {
  isPositive: boolean // isPositive를 주면 isNegative, isZero는 줄수 없음
  isNegative?: never
  isZero?: never
}

type NegativeNumber = RandomNumberType & {
  isPositive?: never
  isNegative: boolean
  isZero?: never
}

type Zero = RandomNumberType & {
  isPositive?: never
  isNegative?: never
  isZero: boolean
}

type RandomNumberProps = PositiveNumber | NegativeNumber | Zero


export const RandomNumber = ({
  value,
  isPositive,
  isNegative,
  isZero
}: RandomNumberProps) => {
  return (
    <div>
      {value} {isPositive && 'positive'} {isNegative && 'negative'}
      {isZero && 'zero'}
    </div>
  )
}
```