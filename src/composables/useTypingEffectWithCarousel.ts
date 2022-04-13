const waitForMs = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const typeSentence = async (sentence: string, eleRef: HTMLSpanElement, delay = 100) => {
  const letters = sentence.split('')
  let i = 0
  while (i < letters.length) {
    await waitForMs(delay)
    eleRef.append(letters[i])
    i++
  }
  return
}

const deleteSentence = async (eleRef: HTMLSpanElement) => {
  const sentence = eleRef.textContent
  const letters = sentence?.split('')
  if (letters === undefined) return
  let i = 0
  while (letters?.length > 0) {
    await waitForMs(100)
    letters.pop()
    eleRef.removeChild(eleRef.childNodes[eleRef.childNodes.length - 1])
  }
}

const updateFontColor = (elRef: HTMLSpanElement, color: string) => {
  elRef.style.color = color
}

const carousel = async (eleRef: HTMLSpanElement, carouselList: { text: string, color: string }[]) => {
  let i = 0
  while (i < carouselList.length) {
    updateFontColor(eleRef, carouselList[i].color)
    await typeSentence(carouselList[i].text, eleRef)
    if (i < carouselList.length - 1) {
      await waitForMs(1500)
      await deleteSentence(eleRef)
      await waitForMs(500)
    }
    i++
  }
}

const useTypingEffectWithCarousel = async (staticEleRef: HTMLSpanElement, dynamicEleRef: HTMLSpanElement, text: string, carouselList: { text: string, color: string }[]) => {
  await typeSentence(text, staticEleRef)
  await carousel(dynamicEleRef, carouselList)
}


export default useTypingEffectWithCarousel