import {CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";
import Experience from "../Experience.js";

export default class QuestMarker {
  constructor(target, offset = 0) {
    this.experience = new Experience()
    this.target = target
    this.offset = offset
    this.targeting = false
  }

  setHTML() {
    this.questMarkerContainer = document.createElement('div');
    this.questMarkerContainer.id = 'quest-marker-container';
    this.questMarkerContainer.classList.add('quest-marker-container', 'quest-marker-container-' + this.target.id);

    let iconContainer = document.createElement('div');
    iconContainer.classList.add('quest-marker-icon-container');

    let icon = document.createElement('img');
    icon.src = 'icons/logo_blue.svg';
    icon.classList.add('quest-marker-icon-image');
    iconContainer.appendChild(icon);

    this.questMarkerContainer.appendChild(iconContainer);
  }

  setCSS2DObject() {
    this.markerObject = new CSS2DObject(this.questMarkerContainer)
    this.markerObject.position.set(0, this.offset, 0);
    this.target.object.add(this.markerObject);
  }

  mark() {
    this.targeting = true
    this.setHTML()
    this.setCSS2DObject()
  }

  unmark() {
    this.targeting = false
    this.target.object.remove(this.markerObject)
    this.questMarkerContainer = null
  }

  destroy() {
    this.target = null
    this.offset = null
    this.targeting = null
  }
}