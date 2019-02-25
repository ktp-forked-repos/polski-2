class Lesson {
  public id: number
  public completed: boolean
  public words: Word[]
  public skillId: 1
  public createdAt: Date
  public updatedAt: Date
  
  public constructor() {
    this.id = 0
    this.completed = false
    this.words = []
    this.skillId = 0
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export default Lesson