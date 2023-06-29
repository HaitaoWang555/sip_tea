import { TemplateSettings, template } from 'dot';
import { Logger } from '@nestjs/common';

export const camel = (str: string, firstUpper: boolean) => {
  let ret = str.toLowerCase();
  ret = ret.replace(/_([\w+])/g, function (all, letter) {
    return letter.toUpperCase();
  });
  if (firstUpper) {
    ret = ret.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
      return $1.toUpperCase() + $2;
    });
  }
  return ret;
};

export const underline = (str: string, upper: boolean) => {
  const ret = str.replace(/([A-Z])/g, '_$1');
  if (upper) {
    return ret.toUpperCase();
  } else {
    return ret.toLowerCase();
  }
};
export const upperCase = (str: string) => {
  return str.toLocaleUpperCase();
};
export const lowerCase = (str: string) => {
  return str.toLocaleLowerCase();
};

const conf = {
  evaluate: /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode: /\{\{!([\s\S]+?)\}\}/g,
  use: /\{\{#([\s\S]+?)\}\}/g,
  define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  varname: 'it',
  strip: false,
  append: true,
  doNotSkipEncoded: false,
  selfcontained: false,
} as unknown as TemplateSettings;

export function getTemplateString<T>(str: string, data: T): string {
  const tplText = str.replace(/(^\s*)|(\s*$)/g, '');
  let resultText = '';

  try {
    resultText = template(
      tplText,
      conf,
    )({
      ...data,
      fn: {
        camel,
        underline,
        upperCase,
        lowerCase,
      },
    });
  } catch (error) {
    new Logger('getTemplateString').error(error);
    throw new Error('模版生成出错！');
  }
  resultText = resultText.replace(/\n(\n)*( )*(\n)*\n/g, '\n');
  resultText = resultText.replace(/^\n+|\n+$/g, '');
  resultText = resultText.replace(/\r\n(\r\n)*( )*(\r\n)*\r\n/g, '\r\n');
  resultText = resultText.replace(/^\r\n+|\r\n+$/g, '');
  resultText = resultText.replace(/\$blankline/g, '');
  return resultText;
}
