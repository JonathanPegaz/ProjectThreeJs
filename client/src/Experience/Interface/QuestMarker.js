import {CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";
import Experience from "../Experience.js";

export default class QuestMarker {
  constructor(target, offset = 1.5) {
    this.experience = new Experience()
    this.target = target
    this.offset = offset
  }

  setHTML() {
    this.questMarkerContainer = document.createElement('div');
    this.questMarkerContainer.id = 'quest-marker-container';
    this.questMarkerContainer.classList.add('quest-marker-container', 'quest-marker-container-' + this.target.id);

    let iconContainer = document.createElement('div');
    iconContainer.classList.add('quest-marker-icon-container');

    let icon = document.createElement('img');
    icon.src = 'icons/hamsa-solid.svg';
    icon.classList.add('quest-marker-icon-image');
    iconContainer.appendChild(icon);

    this.questMarkerContainer.appendChild(iconContainer);
  }

  setCSS2DObject() {
    this.markerObject = new CSS2DObject(this.questMarkerContainer)
    this.markerObject.position.set(0, this.target.object.position.y + this.offset, 0);
    this.target.object.add(this.markerObject);
  }

  mark() {
    this.setHTML()
    this.setCSS2DObject()
  }

  unmark() {
    console.log(`quest-marker-${this.target.id}`)
    this.target.object.remove(this.markerObject)
    this.questMarkerContainer = null
  }

  destroy() {
    this.target = null
    this.offset = null
  }
}