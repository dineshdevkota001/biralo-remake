import { Row } from "native-base"

interface IDuplicateProps {
  Component: React.FC
  times?: number
}
export default function Duplicate({ Component, times = 6 }: IDuplicateProps) {
  return <Row flexWrap="wrap">
    {Array.from({ length: times }).map((_, index) => <Component key={`skeleton-${index.toString()}`} />)}
  </Row>
}
