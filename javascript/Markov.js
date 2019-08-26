/**---WordCount----*/
function WordCount(w) {
  this.word = w;
  this.count = 1;

  this.getWord = function(){
    return this.word;
  };

  this.getCount = function(){
    return this.count;
  };

  this.increment = function(){
    this.count++;
  };

  this.setCount = function(c){
    this.count = c;
  };

  this.toString = function(){
    var result = this.word.concat(' : ');
    result = result.concat(this.count);
    return result;
  };
}

/**-----WordCountList-----**/
function WordCountList() {
  this.list = [];

  this.getList = function(){
    return this.list;
  };

  this.add = function(word){
    if(word === undefined)
        return undefined;

    var lowercase = word.toLowerCase();
    var size = this.list.length;

    if(lowercase === undefined)
        return;

    if(size === 0){
      var newWord = new WordCount(lowercase);
      this.list.push(newWord);
      return;
    }

    for(i = 0; i < this.list.length; i++){
      var currentWord = this.list[i].getWord().toLowerCase();

      if(currentWord == lowercase){
          if(this.list[i] !== undefined){
              this.list[i].increment();
          }
        return;
      }
    }

    var newWord = new WordCount(lowercase);
    this.list.push(newWord);
  };

  this.toString = function(){
    var currentWord = "";
    var wordCount = "";
    var wordCount = 0;
    var format = "";

    for(var i = 0; i < this.list.length; i++){
      currentWord = this.list[i].getWord();
      wordCount = this.list[i].getCount();

      format += currentWord+"("+wordCount;

      if(i < this.list.length - 1){
        format = format.concat(") ");
      } else if ( i === this.list.length - 1){
        format = format.concat(")");
      }
    }

    return format.toString();
  };
}

function MarkovModel(degree){
    const SPACE = " ";
    const NEW_LINE = '/n';
    const DELIMITER = '|';
    this.degree = degree;
    this.predictionMap = new Map();
    this.random = Math.random();

    this.trainFromText = function(filename) {
        var content = "";
        var currentWord = "";
        var currentChar = "";
        var i = 0;

        var input = window.prompt("Enter the text:");
        var result = input;

        while(i < this.degree){
            currentWord = input.split(SPACE);
            result.concat(SPACE+currentWord);
            i++;
        }
        content = result.toString();
        trainWordModel(content);
    }

    this.trainWordModel = function(content){
        var getPrefix = "";
        var current = "";
        var prefixWord = "";
        var nextWord = "";
        var words = [];

        var input = content.toLowerCase()
        words = input.trim().split(" ");


        // console.log("words: "+words);
        // console.log(words.length);

        for(var i = 0; i < words.length - this.degree; i++){
            for(var j = 0; j < degree; j++){
                prefixWord = words[i+j];
                getPrefix += prefixWord+DELIMITER;
                if(j === degree-1){
                    nextWord = words[i+j+1];
                }
            }

            var prefix = getPrefix;
            getPrefix = "";

            if(this.predictionMap.entries().length === 0 || !(this.predictionMap.has(prefix))) {
                var wordList = new WordCountList();
                this.predictionMap.set(prefix, wordList);
            }

            this.predictionMap.get(prefix).add(nextWord);
            // console.log(this.predictionMap.toString());
            // console.log(this.predictionMap.entries());
        }
    }

    this.getFlattenedList = function(prefix){

        if(!(this.predictionMap.has(prefix))) {
          return;
        }
        var flattenedList = [];
        var keyCheck = "";
        var currentWord = "";
        var current = "";
        var wordCount = 0;

        prefix.toLowerCase();



        var wordList = this.predictionMap.get(prefix);

        for(var i = 0; i < wordList.getList().length; i++){
            currentWord = wordList.getList()[i].getWord();
            wordCount = wordList.getList()[i].getCount();

            for(var j = 0; j < wordCount; j++){
              flattenedList.push(currentWord);
            }
        }

        return flattenedList;
    }

    this.generateNext = function(prefix){
        var generatedWord = "";
        var generator = 0;

        var flatList = this.getFlattenedList(prefix);
        if(flatList === undefined){
          return " ";
        }

        generator = Math.floor(this.random * flatList.length);
        generatedWord = flatList[generator];
        return generatedWord;
    }

    this.generate = function(count){
        if(count < 0){
          count = 0;
        }

        var format = "";
        var newKey = "";
        var generatedList = [];
        var currentWord = "";
        var generatedText = "";
        var current = "";
        var generator = 0;

        var keys = Array.from(this.predictionMap.keys());
        generator = Math.floor(Math.random() * keys.length);
        var generatedKey = keys[generator];
        var generatedWord = this.generateNext(generatedKey);
        console.log(generatedKey+" "+generatedWord);

        for(var j = 0; j < generatedKey.length; j++){
            current = generatedKey.charAt(j);

            if(current != DELIMITER){
                format += current;
            } else if(current == DELIMITER){
                generatedList.push(format);
                format += currentWord+" ";
                format = "";
            }
        }

        for(var i = 0; i < count; i++){
            if(i === 0){
                generatedWord = this.generateNext(generatedKey);
            } else{
                generatedList.shift();
                generatedList.push(generatedWord);

                for(var k = 0; k < generatedList.length; k++){
                    newKey += generatedList[k]+DELIMITER;
                }

                generatedKey = newKey;
                newKey = "";
                generatedWord = this.generateNext(generatedKey);
            }
            format += generatedWord+" ";
        }
        generatedText = format.toString();
        return generatedText;
    }

    this.toString = function(){
        var format = "";
        var result = "";
        var current = "";

        for (var key of this.predictionMap.keys()) {
            var wordList = this.predictionMap.get(key);

            for(var i = 0; i < key.length; i++){
                current = key.charAt(i);

                if(current === DELIMITER){
                    format.concat(SPACE);
                }else{
                    format.concat(current);
                }
            }

            result += format.toString()+": "+wordList.toString()+"/n";
            format = "";
        }
        result = result.substring(0 , result.length - 1 );
        return result;
    }
}

function writeOutput(){
  var input = document.getElementById("inputMarkov").value;
  var model = new MarkovModel(2);
  model.trainWordModel(input);
  var generatedText = model.generate(60);
  document.getElementById("outputMarkov").value = generatedText;
}
