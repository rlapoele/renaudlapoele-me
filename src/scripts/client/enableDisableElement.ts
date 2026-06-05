export function enableLinkElement(element: HTMLAnchorElement): void {
  if (element) {
    element.href = element.dataset.originalHref ?? '#';;
    delete element.dataset.originalHref;
  }
}

export function disableLinkElement(element: HTMLAnchorElement): void {
  if (element) {
    element.dataset.originalHref = element.href;
    element.href = '';
  }
}

export function disableElement(element: HTMLElement): void {
  if (element) {
    if(element instanceof HTMLAnchorElement) {
      disableLinkElement(element);
    }
    else {
      element.setAttribute('disabled', '');
      element.setAttribute('aria-disabled', 'true');
    }
  }
}

export function enableElement(element: HTMLElement): void {
  if (element) {
    if (element instanceof HTMLAnchorElement) {
      enableLinkElement(element);
    }
    else {
      element.removeAttribute('disabled');
      element.removeAttribute('aria-disabled');
    }
  }
}

export function disableElements(elements: HTMLElement[]): void {
  elements.forEach((element):void => {
    disableElement(element);
  });
}

export function enableElements(elements: HTMLElement[]): void {
  elements.forEach((element):void => {
    enableElement(element)
  });
}
