import { clone } from 'src/app/Util'

/**
 * @type {Queueable}
 */
export default class Queueable {
  /**
   * @type {Array}
   */
  queue = []

  /**
   * @type {number}
   */
  index = 0

  /**
   * @type {number}
   */
  total = 0

  /**
   * @type {number}
   */
  counter = 0

  /**
   * Queueable constructor
   *
   * @onStart:
   *   - parameters: queue, payload
   *   - return: false to abort
   *
   * @onWalk:
   *   - parameters: current, payload
   *   - return: false to cancel onProgress and abort
   *
   * @onProgress:
   *   - parameters: current, payload
   *   - return: false to abort
   *
   * @onEnd:
   *   - parameters: payload, Queueable
   *   - return: array to restart queue OR false to keep walking
   *
   * @onFinish:
   *   - parameters: payload
   *   - return: ignored
   *
   * @onAbort:
   *   - parameters: step, payload
   *   - return: ignored
   *
   * @timeout: number to use with window.setTimeout
   *
   * @param {Object} options
   */
  constructor (options) {
    const { onStart, onWalk, onProgress, onEnd, onFinish, onAbort, timeout } = options
    this.onStart = onStart
    this.onWalk = onWalk
    this.onProgress = onProgress
    this.onEnd = onEnd
    this.onFinish = onFinish
    this.onAbort = onAbort
    this.timeout = timeout || 1
  }

  /**
   * @param {Object} options
   * @returns {Queueable}
   */
  static build (options) {
    return new this(options)
  }

  /**
   * @param {Array} queue
   */
  run (queue) {
    this.setQueue(queue)

    // noinspection JSIgnoredPromiseFromCall
    this.start()
  }

  /**
   * @param {Array} queue
   */
  setQueue (queue) {
    this.queue = clone(queue)
    this.index = 0
    this.total = this.queue.length
  }

  /**
   */
  async start () {
    let goOn = true
    if (this.onStart) {
      goOn = await this.onStart(this.queue, this.payload())
    }
    if (goOn === false) {
      this.abort('start')
      return
    }
    // noinspection JSIgnoredPromiseFromCall
    this.walk()
  }

  /**
   */
  async walk () {
    let goOn = true
    const current = this.queue.shift()
    this.index++
    if (this.onWalk) {
      goOn = await this.onWalk(current, this.payload())
      this.counter++
    }
    if (goOn !== false && this.onProgress) {
      goOn = await this.onProgress(current, this.payload())
    }
    if (goOn === false) {
      this.abort('walk')
      return
    }
    if (this.index <= this.total - 1) {
      this.next()
      return
    }
    // noinspection JSIgnoredPromiseFromCall
    this.end()
  }

  /**
   */
  async end () {
    let ended = true
    if (this.onEnd) {
      ended = await this.onEnd(this.payload(), this)
    }

    if (ended === false) {
      this.next()
      return
    }
    if (Array.isArray(ended)) {
      // noinspection JSCheckFunctionSignatures
      this.setQueue(ended)
      this.next()
      return
    }
    this.finish()
  }

  /**
   */
  finish () {
    if (this.onFinish) {
      this.onFinish(this.payload())
    }
  }

  /**
   * @param {string} step
   */
  abort (step) {
    if (this.onAbort) {
      this.onAbort(step, this.payload())
    }
  }

  /**
   * @returns {number}
   */
  next () {
    return window.setTimeout(() => this.walk(), this.timeout)
  }

  /**
   * @returns {Object}
   */
  payload () {
    return {
      index: this.index,
      total: this.total,
      counter: this.counter
    }
  }
}
