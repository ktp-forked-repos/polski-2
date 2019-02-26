class Word {
  public id: number
  public text: string
  public selected: boolean
  public correct: boolean
  public progress: number
  public category: string
  public weight: number
  
  public constructor() {
    this.id = 0
    this.text = ''
    this.selected = false
    this.correct = false
    this.progress = 0
    this.category = ''
    this.weight = 0
  }
}

export default Word