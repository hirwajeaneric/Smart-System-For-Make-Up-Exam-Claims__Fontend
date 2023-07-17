export function getSimpleCapitalizedChars(name) {
    var words = name.split(" ");
    var result = "";
    
    for (var i = 0; i < words.length; i++) {
      result += words[i].charAt(0).toUpperCase();
    }
    
    return result.substring(0, 2);
}