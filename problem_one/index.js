function suggestionElementPreparation(suggestionElemClass, suggestionClickEvent) {

    const suggestionElem = document.getElementById("mf-suggestion-event");
    
    if (typeof suggestionClickEvent === "string") {
        suggestionElem.onclick = new Function(suggestionClickEvent);
    } else {
        suggestionElem.onclick = suggestionClickEvent;
    }
}
