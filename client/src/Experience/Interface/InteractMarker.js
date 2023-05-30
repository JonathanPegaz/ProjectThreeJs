import {CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";
import Experience from "../Experience.js";

export default class InteractMarker {
  constructor(target, offset = 0) {
    this.experience = new Experience()
    this.target = target
    this.offset = offset
    this.marked = false
    this.circle = null
  }

  setHTML() {
    this.interactMarkerContainer = document.createElement('div');
    this.interactMarkerContainer.id = 'interact-marker-container';
    this.interactMarkerContainer.classList.add('interact-marker-container', 'interact-marker-container-' + this.target.id);

    this.interactMarkerContainer.innerHTML = `
    <span class="interact-marker-input">F</span>
    <svg class="progress-ring">
      <circle class="progress-ring__circle" stroke="white" stroke-width="3" fill="transparent" r="20" cx="50%" cy="50%"/>
    </svg>`

    this.circle = this.interactMarkerContainer.querySelector('.progress-ring__circle');
  }


  setCSS2DObject() {
    this.markerObject = new CSS2DObject(this.interactMarkerContainer)
    this.markerObject.position.set(0, this.offset, 0);
    this.target.object.add(this.markerObject);
  }

  mark() {
    if (this.marked) return
    this.marked = true
    this.setHTML()
    this.setCSS2DObject()

    let radius = this.circle.r.baseVal.value;
    this.circumference = radius * 2 * Math.PI;

    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = `${this.circumference}`;

    this.setProgress(0)
  }

  unmark() {
    if (!this.marked) return
    this.marked = false
    this.target.object.remove(this.markerObject)
    this.interactMarkerContainer = null
  }

  press(step, goal) {
    const state = (step / goal) * 100;
    this.setProgress(state)
  }

  stopPress() {
    this.setProgress(0)
  }

  setProgress(percent) {
    this.circle.style.strokeDashoffset = this.circumference - percent / 100 * this.circumference;
  }

  destroy() {
    this.target = null
    this.offset = null
    this.marked = null
    this.circle = null
    this.interactMarkerContainer = null
  }
}