class KickParticipantEventHandler extends SDEventHandler {
  handleStreamDeckEvent = (message) => {
    console.log('KickParticipantEventHandler.handleStreamDeckEvent', {message})
    const { event, payload } = message
    if (event === "kickParticipant" && typeof payload.participantName === "string") {
      this._kickParticipant(payload.participantName)
    }
  };

  _wait = async (ms) => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  _queryTextContent = (text, elm) => {
    return document.evaluate(`//${elm}[text()='${text}']`, document, null, XPathResult.ANY_TYPE, null ).iterateNext()
  }

  _getKickButton = (participantName) => {
    console.log('KickParticipantEventHandler._kickParticipant', {participantName})
    const label = `Remove ${participantName} from the call`
    console.log({label})

    const kickLabel = this._queryTextContent(label, "div")
    console.log({kickLabel})
    if (!kickLabel) throw new ControlsNotFoundError(`Couldn't find button to kick ${participantName}!`)
    
    const kickButton = kickLabel.previousSibling
    console.log({kickButton})
    if (!kickButton) throw new ControlsNotFoundError(`Couldn't find button to kick ${participantName}!`)

    return kickButton
  }

  _getRemoveButton = () => {
    const removeButton = this._queryTextContent("Remove", "span")
    console.log({removeButton})
    if (!removeButton) throw new ControlsNotFoundError("No remove participant button found!");
    return removeButton
  }

  _kickParticipant = async (participantName) => {
    const kickButton = this._getKickButton(participantName)
    kickButton.click()

    console.log("waiting")
    await this._wait(250);
    console.log("done waiting")

    const removeButton = this._getRemoveButton()
    console.log(removeButton)
    removeButton.click()
    console.log("clicked")
  };
}
