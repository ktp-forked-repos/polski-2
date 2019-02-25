class Word {
  public id: number
  public text: string
  public selected: boolean
  public correct: boolean
  public progress: number
  public category: string
  public expression: Word[]
  
  public constructor() {
    this.id = 0
    this.text = ''
    this.selected = false
    this.correct = false
    this.progress = 0
    this.category = ''
    this.expression = []
  }
}

export default Word