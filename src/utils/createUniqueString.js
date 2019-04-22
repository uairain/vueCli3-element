/**
 * Created by jiachenpan on 17/3/8.
 */
export default function createUniqueString() {
  const timestamp = String(Number(new Date()))
  const randomNum = String(parseInt((1 + Math.random()) * 65536))

  return (Number(randomNum + timestamp)).toString(32)
}
