/* ============ DATA ============ */

// One entry per rank, in progression order (index 0 = E-Rank, index 5 = S-Rank).
// state.rankIdx is just an index into THIS array — bumping it is what makes the
// player's rank badge, title/job text, and hex color change everywhere in the UI.
// GATES[i] (below) and RANK_META[i] are always the same rank, matched by index.
const RANK_META = [
  {rank:'E', name:'Gate of Awakening',      job:'Unranked Hunter',        color:'#8fd3ff'},
  {rank:'D', name:'Gate of Branching Paths',job:'Novice Hunter',          color:'#35e08a'},
  {rank:'C', name:'Gate of Structures',     job:'Hunter',                 color:'#f5c542'},
  {rank:'B', name:'Gate of Objects',        job:'Elite Hunter',           color:'#ff9d42'},
  {rank:'A', name:'Gate of Inheritance',    job:'National-Level (Trainee)',color:'#ff5e5e'},
  {rank:'S', name:'Gate of the Monarch',    job:'Shadow Monarch',         color:'#8b5cf6'},
];

// GATES[i] is the actual content for RANK_META[i]'s gate. Each gate has:
//   quests  — an array of lessons the player clears one at a time ("qi" = quest index)
//   boss    — one tougher review battle, only reachable once every quest is cleared
// Each quest/boss object has: title, tag (category label), lesson (HTML teaching
// text shown first), points (key-syntax bullets), code (example snippet), and
// questions (the actual quiz — see buildModal/renderQuizStage for how these are graded).
// Progress through a quest is tracked elsewhere as the string "gateIndex-questIndex"
// (see state.cleared below), not stored on these objects themselves — GATES is
// static reference data, never mutated at runtime.
const GATES = [
{ // E
  quests:[
    {title:'Variables & Data Types', tag:'VARIABLES', lesson:"A variable is a labeled box for a value, and every box has a fixed type. Java is <b>statically typed</b>, meaning you declare that type up front — <span class='mono'>int</span>, <span class='mono'>double</span>, <span class='mono'>String</span>, <span class='mono'>boolean</span>, <span class='mono'>char</span> — and the compiler enforces it forever after. A box built to hold numbers can never suddenly hold text; try it and your code won't even compile. This might feel restrictive coming from looser languages, but it's a safety net: entire categories of bugs get caught before your program ever runs.",
     points:["int → whole numbers (no decimal point)","double → decimal / floating-point numbers","String → text, always in double quotes","boolean → only true or false","char → a single character, in single quotes"],
     code:"int level = 1;\ndouble accuracy = 99.5;\nString title = \"Awakened\";\nboolean isHunter = true;\nchar grade = 'E';",},
    {title:'Operators', tag:'OPERATORS', lesson:"Java's arithmetic operators — <span class='mono'>+  -  *  /  %</span> — do exactly what you'd expect from math class, with one exception worth memorizing: when you divide two <span class='mono'>int</span> values, Java performs <b>integer division</b> and simply throws away anything after the decimal point. The <span class='mono'>%</span> (modulo) operator hands you back that discarded remainder instead, which is how programmers commonly check things like 'is this number even?' or 'has this loop reached a multiple of 10?'.",
     points:["+ - * / do standard math","int / int drops the decimal (9/2 = 4, not 4.5)","% gives the remainder of a division","== compares values; = assigns a value"],
     code:"int x = 7 / 2;      // 3  (integer division drops the remainder)\nint y = 7 % 2;      // 1  (the remainder)\nboolean even = (y == 0);",},
    {title:'Input & Output', tag:'I/O', lesson:"<span class='mono'>System.out.println()</span> writes a line of text to the console — it's how your program talks to the outside world. Going the other direction, reading what a person types, needs a <span class='mono'>Scanner</span> object wired up to <span class='mono'>System.in</span> (the standard input stream). Once you have a Scanner, methods like <span class='mono'>.nextLine()</span>, <span class='mono'>.nextInt()</span>, and <span class='mono'>.nextDouble()</span> let you pull in exactly the type of value you're expecting.",
     points:["System.out.println(x) → prints x, then moves to a new line","System.out.print(x) → prints x, cursor stays on the line","new Scanner(System.in) → creates a reader for keyboard input","sc.nextLine() reads a full line of text as a String"],
     code:"Scanner sc = new Scanner(System.in);\nSystem.out.print(\"Enter your name: \");\nString name = sc.nextLine();\nSystem.out.println(\"Welcome, \" + name);",},
    {title:'Comments & Style', tag:'STYLE', lesson:"Comments are notes written for the next human reader — yourself included — and the compiler skips over them entirely. Use <span class='mono'>//</span> for a quick single-line note, or wrap longer explanations in <span class='mono'>/* ... */</span>. One easy-to-miss rule that trips up beginners constantly: Java is <b>case-sensitive</b>, so <span class='mono'>myVar</span>, <span class='mono'>MyVar</span>, and <span class='mono'>MYVAR</span> are three completely unrelated names as far as the compiler is concerned.",
     points:["// starts a single-line comment","/* ... */ wraps a multi-line comment","Java is case-sensitive: score ≠ Score","Every statement ends with a semicolon ;"],
     code:"// this is a single-line comment\n/* this spans\n   multiple lines */\nint myVar = 5;",}
  ],
  boss:{title:'The Instantiator', tag:'E-RANK BOSS', lesson:"A guardian built from raw syntax. It tests everything you've learned about variables, operators, and I/O at once — no new material, just proof that the fundamentals have actually stuck.",
    questions:[
      {q:"Which declaration correctly stores the character 'E'?", c:["String grade = 'E';","char grade = \"E\";","char grade = 'E';","int grade = 'E';"], a:2, e:"char uses single quotes and holds exactly one character."},
      {q:"What does int remainder = 10 % 3; store?", c:["3","1","3.33","0"], a:1, e:"10 divided by 3 is 3 remainder 1 — modulo returns that leftover 1."},
      {q:"Which line correctly prints a Scanner-read integer input?", c:["int n = sc.nextInt();","int n = sc.readInt();","int n = Scanner.getInt();","int n = System.in.nextInt();"], a:0, e:"Scanner provides nextInt() to read a typed integer directly."}
    ]}
},
{ // D
  quests:[
    {title:'If / Else', tag:'CONTROL FLOW', lesson:"Real programs need to make decisions, and <span class='mono'>if / else</span> is how Java does it. The condition inside the parentheses is evaluated to either <span class='mono'>true</span> or <span class='mono'>false</span>; if it's true, the <span class='mono'>if</span> block runs and the <span class='mono'>else</span> block is skipped entirely — and vice versa. You can chain <span class='mono'>else if</span> to test multiple conditions in sequence, but only the first one that matches will ever execute.",
     points:["if (condition) { ... } else { ... }","Only one branch ever runs, never both","Comparisons use == != < > <= >=","Chain else if for multiple conditions in order"],
     code:"int power = 45;\nif (power >= 50) {\n    System.out.println(\"Gate cleared\");\n} else {\n    System.out.println(\"Retreat\");\n}",},
    {title:'Switch Statements', tag:'CONTROL FLOW', lesson:"When you find yourself chaining many <span class='mono'>else if</span> checks against the same variable, a <span class='mono'>switch</span> is usually clearer. It compares one value against a list of <span class='mono'>case</span> labels and jumps straight to the match. The <span class='mono'>break</span> keyword at the end of each case is easy to forget but important — without it, execution 'falls through' into the next case below, running code you didn't intend to run.",
     points:["switch(value) { case X: ...; break; }","break stops fall-through into the next case","default runs when nothing else matches","Great for comparing one variable against many fixed options"],
     code:"switch (rank) {\n    case \"E\": System.out.println(\"Novice\"); break;\n    case \"S\": System.out.println(\"Monarch\"); break;\n    default: System.out.println(\"Unranked\");\n}",},
    {title:'For Loops', tag:'LOOPS', lesson:"A <span class='mono'>for</span> loop is built for the common case where you already know roughly how many times you want to repeat something. It packs three pieces into one line: a starting point, a condition that's checked before every pass, and an update that runs after every pass. As long as the condition stays true, the loop body keeps executing — get any of the three pieces wrong and you risk an infinite loop.",
     points:["for (start; condition; update) { ... }","Checks the condition BEFORE each pass","i++ increases i by 1 after each pass","Runs zero times if the condition starts false"],
     code:"for (int i = 1; i <= 5; i++) {\n    System.out.println(\"Wave \" + i);\n}",},
    {title:'While & Do-While', tag:'LOOPS', lesson:"A <span class='mono'>while</span> loop is the more general cousin of <span class='mono'>for</span>: it just keeps running its body as long as the condition stays true, with no built-in counter. That makes it ideal when you don't know the exact number of iterations ahead of time — say, reading input until the user types 'quit'. A <span class='mono'>do-while</span> is nearly identical, except it checks the condition <i>after</i> the body runs, which guarantees the body executes at least once even if the condition starts out false.",
     points:["while (condition) { ... } — checks before each pass","do { ... } while (condition); — checks after, runs at least once","Both need something inside the loop that eventually makes the condition false","Forgetting to update the condition causes an infinite loop"],
     code:"int hp = 3;\nwhile (hp > 0) {\n    hp--;\n}\n// hp is now 0",}
  ],
  boss:{title:'The Loop Wraith', tag:'D-RANK BOSS', lesson:"An enemy that phases in and out — you'll need to control exactly when and how many times you strike. No new theory here, just if/else, switch, and loops working together under pressure.",
    questions:[
      {q:"Which loop guarantees its body runs at least once?", c:["for","while","do-while","if"], a:2, e:"do-while checks the condition after running the body once."},
      {q:"What prints? for(int i=0; i<3; i++){ System.out.print(i); }", c:["123","012","0123","321"], a:1, e:"i starts at 0 and runs while i<3, printing 0, then 1, then 2."},
      {q:"Which keyword immediately exits a loop entirely?", c:["continue","exit","break","stop"], a:2, e:"break exits the nearest enclosing loop (or switch) immediately."}
    ]}
},
{ // C
  quests:[
    {title:'Arrays', tag:'STRUCTURES', lesson:"An array is a fixed-size container that holds multiple values of the same type in a row, each one accessed by a numeric index. The critical thing to internalize: Java arrays are <b>zero-indexed</b>, meaning the first element lives at index 0, not 1. So an array of 3 elements has valid indexes 0, 1, and 2 — reaching for index 3 throws an ArrayIndexOutOfBoundsException, one of the most common early-career bugs.",
     points:["int[] scores = {88, 92, 75}; — fixed size, set at creation","First element is index 0, last is length-1","scores.length gives the size (no parentheses — it's a field, not a method)","Accessing an out-of-range index crashes the program"],
     code:"int[] scores = {88, 92, 75};\nSystem.out.println(scores[0]); // 88\nSystem.out.println(scores.length); // 3",},
    {title:'Strings Deep Dive', tag:'STRUCTURES', lesson:"A String isn't a primitive — it's an object, and it comes with a whole toolbox of built-in methods: <span class='mono'>.length()</span>, <span class='mono'>.toUpperCase()</span>, <span class='mono'>.substring()</span>, and more. The single most important habit to build here is comparing Strings with <span class='mono'>.equals()</span>, never <span class='mono'>==</span>. That's because <span class='mono'>==</span> checks whether two variables point to the exact same object in memory, while <span class='mono'>.equals()</span> checks whether their actual text content matches — and two Strings can hold identical text while being different objects.",
     points:[".length() → number of characters",".toUpperCase() / .toLowerCase() → case conversion",".substring(start, end) → extracts part of the text","Always use .equals() to compare content, never =="],
     code:"String s = \"Hunter\";\nSystem.out.println(s.length());       // 6\nSystem.out.println(s.toUpperCase());  // HUNTER",},
    {title:'Methods', tag:'STRUCTURES', lesson:"A method packages up a chunk of logic under a name so you can reuse it instead of retyping the same code everywhere. Its signature declares what it needs (parameters, in the parentheses) and what it hands back (the return type, before the name). <span class='mono'>void</span> means 'this method performs an action but returns nothing' — anything else means the method must end with a <span class='mono'>return</span> statement matching that declared type.",
     points:["returnType methodName(parameters) { ... }","void = no return value; otherwise must return a matching type","return immediately exits the method","Parameters are local copies — changes inside don't affect the caller's variable"],
     code:"static int addPower(int a, int b) {\n    return a + b;\n}\n// called as: addPower(10, 15);",},
    {title:'ArrayList Basics', tag:'STRUCTURES', lesson:"Arrays are fast but rigid — their size is locked in the moment you create them. An <span class='mono'>ArrayList</span> (from <span class='mono'>java.util</span>) solves that by growing or shrinking automatically as you add and remove elements. The trade-off is that it only stores objects, not raw primitives, which is why you'll see <span class='mono'>ArrayList&lt;Integer&gt;</span> instead of <span class='mono'>ArrayList&lt;int&gt;</span> — Java auto-converts primitives to their object wrapper behind the scenes.",
     points:["ArrayList<String> list = new ArrayList<>();","list.add(x) appends; list.remove(x) removes","Resizes automatically — no fixed length","Requires import java.util.ArrayList;"],
     code:"ArrayList<String> party = new ArrayList<>();\nparty.add(\"Tank\");\nparty.add(\"Healer\");\nparty.remove(\"Tank\");",}
  ],
  boss:{title:'The Array Golem', tag:'C-RANK BOSS', lesson:"A construct built entirely of indexed slots. It only falls to those who understand structure — arrays, Strings, methods, and ArrayLists, all at once.",
    questions:[
      {q:"int[] nums = {5,10,15}; what does nums[2] return?", c:["10","15","5","Error"], a:1, e:"Index 2 is the third element (index 0,1,2) — that's 15."},
      {q:"Which correctly compares two Strings by content?", c:["a == b","a.equals(b)","a.same(b)","a.compare(b)"], a:1, e:".equals() compares the actual characters inside the Strings."},
      {q:"What does a method with return type 'int' need to include?", c:["A print statement","A return statement giving back an int","Nothing extra","A loop"], a:1, e:"Any non-void method must return a value matching its declared return type."}
    ]}
},
{ // B
  quests:[
    {title:'Classes & Objects', tag:'OOP', lesson:"This is the gate into object-oriented programming, the paradigm Java is built around. A <b>class</b> is a blueprint that describes what something has (fields) and what it can do (methods) — but the blueprint itself isn't a real, usable thing. An <b>object</b> is what you get when you actually build from that blueprint using <span class='mono'>new</span>. You can stamp out as many independent objects from one class as you want, each with its own copy of the fields.",
     points:["class defines the blueprint: fields (data) + methods (behavior)","new ClassName() creates an object (an instance)","Each object has its own independent copy of the fields","object.field accesses data; object.method() calls behavior"],
     code:"class Hunter {\n    String name;\n    int level;\n}\n\nHunter jin = new Hunter();\njin.name = \"Jin-Woo\";\njin.level = 1;",},
    {title:'Constructors', tag:'OOP', lesson:"Manually setting every field right after creating an object, like in the previous lesson, gets tedious and error-prone fast. A <b>constructor</b> automates that: it's a special method that runs the instant an object is created with <span class='mono'>new</span>, immediately setting up its starting state. It always shares the exact name of the class, and — unlike every other method — it never declares a return type, not even <span class='mono'>void</span>.",
     points:["Constructor name must match the class name exactly","Runs automatically when new ClassName(...) is called","No return type at all, ever","A class can have multiple constructors with different parameters"],
     code:"class Hunter {\n    String name;\n    Hunter(String n) {\n        name = n;\n    }\n}\nHunter jin = new Hunter(\"Jin-Woo\");",},
    {title:'Encapsulation', tag:'OOP', lesson:"Encapsulation is the practice of hiding a class's internal fields behind the <span class='mono'>private</span> keyword, so outside code can't reach in and set them to anything it wants — including invalid values, like negative health. Instead, you expose carefully controlled access through public methods: a 'getter' to read the value, and a 'setter' to change it, with validation logic in between. It's one of the four pillars of OOP, and it's what keeps large codebases from turning into chaos.",
     points:["private field { } hides data from outside the class","public getX() returns the value (a 'getter')","public setX(val) changes the value, often with validation (a 'setter')","Protects the object's internal state from invalid changes"],
     code:"class Hunter {\n    private int hp;\n    public int getHp() { return hp; }\n    public void setHp(int h) { if (h >= 0) hp = h; }\n}",},
    {title:'this & static', tag:'OOP', lesson:"<span class='mono'>this</span> refers to 'the current object' — it's most useful when a constructor or method parameter has the same name as a field, letting you write <span class='mono'>this.level = level;</span> to clearly distinguish the field from the parameter. <span class='mono'>static</span> is a different idea entirely: a static member belongs to the <i>class itself</i>, shared by every object, rather than existing separately inside each instance. Think of a static counter that tracks how many Hunters have been created in total.",
     points:["this.field refers to the current object's field explicitly","Useful when a parameter name shadows a field name","static members belong to the class, not any one object","Access a static member via ClassName.member, no object needed"],
     code:"class Hunter {\n    int level;\n    Hunter(int level) {\n        this.level = level; // this.level is the field, level is the parameter\n    }\n    static int totalHunters = 0;\n}",}
  ],
  boss:{title:'The Class Reaper', tag:'B-RANK BOSS', lesson:"It exists in many forms at once — you must understand what's shared and what's unique to each instance: classes, constructors, encapsulation, and static, all under one seal.",
    questions:[
      {q:"What does 'private' access mean for a field?", c:["Accessible everywhere","Only accessible within its own class","Only accessible in main()","Only accessible by subclasses"], a:1, e:"private restricts access to code inside the same class."},
      {q:"Which correctly creates a Hunter object using a constructor Hunter(String n)?", c:["Hunter jin = Hunter(\"Jin-Woo\");","Hunter jin = new Hunter(\"Jin-Woo\");","new Hunter jin(\"Jin-Woo\");","Hunter.new(\"Jin-Woo\");"], a:1, e:"Object creation always uses 'new ClassName(args)'."},
      {q:"A static method can be called...", c:["Only after creating an object","Directly on the class, without an object","Never","Only inside constructors"], a:1, e:"Static methods belong to the class, so you call them like ClassName.method() without an instance."}
    ]}
},
{ // A
  quests:[
    {title:'Inheritance', tag:'ADVANCED OOP', lesson:"Inheritance lets one class (the subclass) automatically pick up the fields and methods of another (the superclass) using the <span class='mono'>extends</span> keyword. This is how you avoid rewriting shared logic: if every Hunter can <span class='mono'>attack()</span>, a ShadowMonarch subclass gets that ability for free just by extending Hunter, and can then add its own unique abilities on top, like <span class='mono'>summon()</span>.",
     points:["class Sub extends Super { } — Sub inherits Super's members","Subclass automatically gets all non-private fields and methods","Subclass can add its own new fields and methods too","Models an 'is-a' relationship — a ShadowMonarch IS-A Hunter"],
     code:"class Hunter { void attack() { System.out.println(\"Strikes!\"); } }\nclass ShadowMonarch extends Hunter {\n    void summon() { System.out.println(\"Arise!\"); }\n}",},
    {title:'Polymorphism', tag:'ADVANCED OOP', lesson:"Inheritance gets its real power from polymorphism: a subclass can <b>override</b> an inherited method to give it entirely new behavior, marked with the <span class='mono'>@Override</span> annotation as a safety check. The remarkable part is what happens when you refer to that object using its superclass's type — Java still runs the subclass's overridden version at runtime, because it looks at what the object <i>actually is</i>, not what type the variable is declared as.",
     points:["@Override marks a method that replaces the inherited version","Same method name and parameters as the superclass version","Java picks the version based on the object's real type, at runtime","This is why polymorphism is sometimes called 'one interface, many forms'"],
     code:"class Hunter { void attack() { System.out.println(\"Basic strike\"); } }\nclass ShadowMonarch extends Hunter {\n    @Override\n    void attack() { System.out.println(\"Shadow Extraction!\"); }\n}",},
    {title:'Interfaces', tag:'ADVANCED OOP', lesson:"An interface is a pure contract: it declares <i>what</i> methods a class must have, without saying <i>how</i> they work. A class agrees to that contract using <span class='mono'>implements</span>, and must then provide a real implementation for every method the interface lists — the compiler won't let it get away with skipping one. Interfaces are especially powerful because a single class can implement several of them, something Java doesn't allow with class inheritance.",
     points:["interface Name { void method(); } — declares, doesn't implement","class X implements Interface { } — X must fill in every method","A class can implement multiple interfaces at once","Defines capability ('can summon') rather than identity ('is a Hunter')"],
     code:"interface Summoner {\n    void summon();\n}\nclass ShadowMonarch implements Summoner {\n    public void summon() { System.out.println(\"Arise!\"); }\n}",},
    {title:'Abstract Classes', tag:'ADVANCED OOP', lesson:"An abstract class sits between a regular class and an interface: it can hold a mix of fully-working methods and <span class='mono'>abstract</span> methods that have no body at all, forcing every subclass to fill them in. Because it's deliberately incomplete, Java won't let you write <span class='mono'>new Hunter()</span> directly if Hunter is abstract — you have to extend it with a concrete subclass first.",
     points:["abstract class can't be instantiated directly with new","abstract method — no body, subclass MUST implement it","Regular methods inside can still have full bodies, shared by all subclasses","Use when subclasses share some logic but must customize other parts"],
     code:"abstract class Hunter {\n    abstract void attack(); // no body — subclass must define it\n    void rest() { System.out.println(\"Recovering...\"); }\n}",}
  ],
  boss:{title:'The Polymorph', tag:'A-RANK BOSS', lesson:"It shifts shape endlessly, appearing as one type while behaving as another — the essence of polymorphism itself. Inheritance, overriding, interfaces, and abstract classes, all in one fight.",
    questions:[
      {q:"Which keyword makes a class inherit from a superclass?", c:["implements","extends","inherits","super"], a:1, e:"extends is used for class-to-class inheritance."},
      {q:"An interface method is fulfilled using which keyword on the class?", c:["extends","implements","abstract","override"], a:1, e:"Classes use 'implements' to fulfill an interface's contract."},
      {q:"Overriding a method means...", c:["Deleting the parent's version entirely from memory","Providing a new implementation in the subclass that runs instead","Making the method private","Renaming the method"], a:1, e:"Overriding replaces the inherited behavior with the subclass's own version, chosen at runtime."}
    ]}
},
{ // S
  quests:[
    {title:'Exception Handling', tag:'ROBUSTNESS', lesson:"Some errors — bad input, a missing file, dividing by zero — are expected possibilities, not bugs, and Java gives you <span class='mono'>try / catch</span> to handle them without crashing the whole program. Code that might fail goes in the <span class='mono'>try</span> block; if it throws an exception matching the <span class='mono'>catch</span> block's type, execution jumps there instead of dying. A <span class='mono'>finally</span> block, if present, is guaranteed to run afterward no matter what — exception or not — making it the right place for cleanup code.",
     points:["try { risky code } catch (ExceptionType e) { handle it }","catch only intercepts exceptions matching its declared type","finally always runs, error or not — ideal for cleanup","e.getMessage() gives details about what went wrong"],
     code:"try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Caught: \" + e.getMessage());\n} finally {\n    System.out.println(\"Cleanup complete\");\n}",},
    {title:'Collections Framework', tag:'DATA', lesson:"Beyond arrays and ArrayList, Java's Collections Framework offers structures shaped for different problems. A <span class='mono'>List</span> keeps insertion order and allows duplicates. A <span class='mono'>Set</span> automatically rejects duplicates, useful for tracking unique items. A <span class='mono'>Map</span> stores key-value pairs, like a real-world dictionary — you look things up by key, and inserting the same key twice simply overwrites the old value rather than creating a duplicate entry.",
     points:["List — ordered, allows duplicates (ArrayList, LinkedList)","Set — no duplicates allowed (HashSet, TreeSet)","Map — key → value pairs (HashMap, TreeMap)","map.put(key, value) inserts or overwrites; map.get(key) retrieves"],
     code:"Map<String, Integer> levels = new HashMap<>();\nlevels.put(\"Jin-Woo\", 1);\nlevels.put(\"Jin-Woo\", 2); // overwrites\nSystem.out.println(levels.get(\"Jin-Woo\")); // 2",},
    {title:'Generics', tag:'TYPE SAFETY', lesson:"Generics are what let you write <span class='mono'>List&lt;String&gt;</span> instead of a plain, untyped List — the angle-bracket part tells the compiler exactly what type of element belongs inside. Try to sneak in the wrong type and your code simply won't compile, catching the mistake immediately instead of letting it explode at runtime deep inside your program. This same pattern extends to your own classes and methods, letting you write one piece of logic that safely works across many types.",
     points:["List<String> restricts the list to Strings only","Wrong-type insertions are caught at compile time, not runtime","<Type> can be any class: Integer, String, or your own classes","Prevents an entire category of ClassCastException bugs"],
     code:"List<String> names = new ArrayList<>();\nnames.add(\"Jin-Woo\");\n// names.add(5); // won't compile — type-safe!",},
    {title:'Streams & Lambdas', tag:'MODERN JAVA', lesson:"A lambda is a small, unnamed function you can pass around like a value — <span class='mono'>n -&gt; n % 2 == 0</span> reads as 'given n, check if it's even'. Streams pair naturally with lambdas to process a collection as a pipeline: <span class='mono'>.filter()</span> keeps only matching elements, <span class='mono'>.map()</span> transforms each one, and a terminal operation like <span class='mono'>.toList()</span> collects the result. It's a more declarative style than writing manual for-loops — you describe <i>what</i> you want, not the step-by-step <i>how</i>.",
     points:["param -> expression is a lambda (a tiny inline function)","list.stream() starts a pipeline over a collection",".filter(condition) keeps only matching elements",".map(transform) converts each element; .toList() collects results"],
     code:"List<Integer> nums = List.of(1,2,3,4,5);\nList<Integer> even = nums.stream()\n    .filter(n -> n % 2 == 0)\n    .toList();\n// even = [2, 4]",}
  ],
  boss:{title:'The Shadow Monarch', tag:'S-RANK — FINAL BOSS', lesson:"The final seal. Every discipline you've mastered — control flow, structures, objects, safety, and modern Java — converges here. This is the last thing standing between you and S-Rank.",
    questions:[
      {q:"Which block always executes after a try, regardless of an exception?", c:["catch","final","finally","end"], a:2, e:"finally always runs, making it ideal for cleanup code."},
      {q:"Which collection type would you use to guarantee no duplicate values?", c:["List","Set","Array","Stack"], a:1, e:"Set enforces uniqueness among its elements by definition."},
      {q:"Generics like List<String> primarily exist to provide...", c:["Faster runtime speed always","Compile-time type safety","Automatic sorting","Smaller file sizes"], a:1, e:"Generics catch type errors when the code is compiled, before it ever runs."},
      {q:"What does a lambda expression like x -> x * 2 represent?", c:["A class","A small anonymous function","A loop condition","An import statement"], a:1, e:"Lambdas define compact, unnamed functions inline — here, one that doubles its input."}
    ]}
}
];

// Each lesson's practice drill (3 questions) lives in drills.js, kept separate
// from the boss questions above on purpose: drills are "read the code / type
// the missing piece / spot the bug" practice, while bosses are quick-fire
// multiple choice. This attaches DRILLS[gate][quest] to the matching quest.
GATES.forEach((gate, gi) => gate.quests.forEach((quest, qi) => {
  quest.questions = DRILLS[gi][qi];
}));

/* ============ STATE ============ */
// The single source of truth for the player's save data. Every screen (Home,
// Dungeons, Lessons, Status) reads from this same object and render() is what
// pushes it out to the DOM — nothing is stored in localStorage, so this all
// is auto-saved to the device's localStorage (see SAVE / LOAD below).
const state = {
  name:'Player',          // Hunter name, editable by clicking the name in Status view
  level:1,                // current level, goes up via gainXP()
  xp:0,                   // XP earned toward the next level (resets to 0 on level-up)
  xpNext:100,             // XP needed to hit the next level; grows 22% every level-up
  rankIdx:0,              // NOT auto-tied to level — only advances when a Gate's Boss falls
  statPoints:0,           // unspent points from leveling up, spent via the "+" buttons in Status
  stats:{LOGIC:1, SYNTAX:1, STRUCT:1, DEBUG:1}, // RPG stats the player allocates; each has a real effect (see STAT EFFECTS)
  cleared:new Set(),      // quest completions, stored as "gateIdx-questIdx" strings, e.g. "0-2"
  bossCleared:new Set(),  // gate indexes whose boss has been defeated — this is what unlocks the next Gate
  openGate:0,             // which Gate card is expanded open in the Dungeons view (-1 = none)
  dailyUsed:false         // whether today's Daily Quest has already been claimed (resets each new day)
};

/* ============ STAT EFFECTS ============ */
// Every stat does ONE distinct, real thing in the game. All the numbers live
// here so the Status screen, the boss battles and the lesson drills always
// agree with each other:
//   LOGIC   -> ANALYZE charges: each one removes 2 wrong answers from a
//              multiple-choice question (in boss fights and lesson drills)
//   SYNTAX  -> CRITICAL HITS: chance that a correct answer in a boss fight
//              hits for double damage (5% per point above 1, capped at 40%)
//   STRUCT  -> MAX HP in boss fights (+10 HP per point above 1)
//   DEBUG   -> DAMAGE REDUCTION: -2 damage from every wrong answer per point
//              above 1 (a mistake never hurts less than 5)
// Every stat starts at 1, which gives no bonus — points must be earned by
// leveling up (3 per level) and spent in the Status screen.
const CRIT_MULT = 2;      // damage multiplier on a critical hit
const STAT_INFO = {
  LOGIC:  {label:'LOGIC',     icon:'🧠', what:'ANALYZE — removes 2 wrong answers from a multiple-choice question.'},
  SYNTAX: {label:'SYNTAX',    icon:'⚡', what:'CRITICAL STRIKES — a right answer in a boss fight can hit for double damage.'},
  STRUCT: {label:'STRUCTURE', icon:'🛡', what:'FORTITUDE — raises your max HP in boss fights.'},
  DEBUG:  {label:'DEBUG',     icon:'🐞', what:'RESILIENCE — wrong answers hurt you less in boss fights.'}
};
// Turns a set of stats (+ level) into the actual gameplay numbers. Takes the
// stats as a parameter (instead of reading `state`) so the Status screen can
// also preview "what would the next point give me?".
function statEffects(stats, level){
  return {
    analyze: Math.floor(stats.LOGIC / 2),                       // Analyze charges per fight / drill
    crit:    Math.min(0.40, (stats.SYNTAX - 1) * 0.05),         // critical-hit chance, 0..0.40
    maxHp:   100 + (level - 1) * 5 + (stats.STRUCT - 1) * 10,   // levels give HP too
    dmgCut:  (stats.DEBUG - 1) * 2                              // damage removed from each mistake
  };
}
// Short human-readable description of a stat's current effect.
function statEffectText(k, fx){
  if (k === 'LOGIC')  return fx.analyze + ' Analyze charge' + (fx.analyze === 1 ? '' : 's') + ' per fight / drill';
  if (k === 'SYNTAX') return Math.round(fx.crit * 100) + '% critical-hit chance';
  if (k === 'STRUCT') return fx.maxHp + ' max HP';
  return '-' + fx.dmgCut + ' damage per mistake';
}
// Removes two wrong answers (always leaving the right one and at least one
// wrong one). `wrongIdx` = positions of the wrong choices; returns the ones to remove.
function pickEliminations(wrongIdx){
  return shuffle(wrongIdx).slice(0, Math.max(0, Math.min(2, wrongIdx.length - 1)));
}

/* ============ SAVE / LOAD ============ */
// Progress is stored in the browser's localStorage on the player's own device,
// so it survives closing the app, rebooting, and updating the app files.
// It saves automatically (render() calls saveGame()), and the Status screen
// adds manual Save, Export/Import (a .json backup file) and Reset buttons.
const SAVE_KEY = 'javaQuestSave_maxed_v1';   // MAXED EDITION: its own save slot, separate from the normal app
const SAVE_VERSION = 1;
let loadedFromSave = false;   // lets the welcome toast say "welcome back"

// Today's date as a simple string, used to reset the Daily Quest each new day.
function todayStr(){
  const d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

// Rank is DERIVED from boss clears, not stored: beating Gate N's boss makes you
// rank N+1 (E -> D -> C -> B -> A -> S). Deriving it means it can never get out
// of sync with bossCleared, in memory or in a save file.
function rankFromBosses(){
  let r = 0;
  state.bossCleared.forEach(g => { r = Math.max(r, Math.min(g + 1, RANK_META.length - 1)); });
  return r;
}

// Turns the live state into a plain object that JSON can store (Sets -> arrays).
function serializeState(){
  return {
    version: SAVE_VERSION,
    savedAt: Date.now(),
    name: state.name,
    level: state.level,
    xp: state.xp,
    xpNext: state.xpNext,
    statPoints: state.statPoints,
    stats: state.stats,
    cleared: [...state.cleared],
    bossCleared: [...state.bossCleared],
    dailyDate: state.dailyUsed ? todayStr() : null
  };
}

// Validates a save object and copies it into `state`. Save data can come from a
// hand-edited backup file, so nothing is trusted: every number is clamped to a
// sane range and every quest id is checked against the real GATES list.
// Throws if the data isn't a Java Quest save at all.
function applySave(d){
  if (!d || typeof d !== 'object' || d.version !== SAVE_VERSION) throw new Error('not a Java Quest save');
  const int = (v, min, max, fallback) => Number.isFinite(v) ? Math.min(max, Math.max(min, Math.floor(v))) : fallback;

  state.name = (typeof d.name === 'string' && d.name.trim()) ? d.name.trim().slice(0, 18) : 'Player';
  state.level = int(d.level, 1, 999, 1);
  state.xpNext = int(d.xpNext, 1, 1e9, 100);
  state.xp = int(d.xp, 0, state.xpNext - 1, 0);
  state.statPoints = int(d.statPoints, 0, 9999, 0);
  const s = d.stats || {};
  state.stats = {
    LOGIC: int(s.LOGIC, 1, 999, 1), SYNTAX: int(s.SYNTAX, 1, 999, 1),
    STRUCT: int(s.STRUCT, 1, 999, 1), DEBUG: int(s.DEBUG, 1, 999, 1)
  };
  // Only keep quest ids like "2-1" that point at a quest that really exists.
  state.cleared = new Set((Array.isArray(d.cleared) ? d.cleared : []).filter(id => {
    const m = /^(\d+)-(\d+)$/.exec(String(id));
    return m && GATES[+m[1]] && GATES[+m[1]].quests[+m[2]];
  }));
  state.bossCleared = new Set((Array.isArray(d.bossCleared) ? d.bossCleared : [])
    .filter(g => Number.isInteger(g) && g >= 0 && g < GATES.length));
  state.dailyUsed = d.dailyDate === todayStr();   // a new calendar day = a fresh Daily Quest
  state.rankIdx = rankFromBosses();
}

// Writes the current progress to this device. Returns false if the browser
// blocks storage (e.g. some private-browsing modes) so the UI can say so.
function saveGame(){
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(serializeState()));
    updateSaveStatus(true);
    return true;
  } catch (e) {
    updateSaveStatus(false);
    return false;
  }
}

// Loads saved progress, if any. A corrupt save is ignored (never crashes the app).
function loadGame(){
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    applySave(JSON.parse(raw));
    return true;
  } catch (e) {
    return false;
  }
}

// Updates the "last saved" line in the Status screen's Save Data panel.
function updateSaveStatus(ok){
  const el = document.getElementById('saveStatus');
  if (!el) return;
  el.textContent = ok
    ? 'AUTO-SAVE ON · Last saved ' + new Date().toLocaleTimeString()
    : 'AUTO-SAVE UNAVAILABLE in this browser — use Export Backup to keep your progress.';
  el.classList.toggle('bad', !ok);
}

// Downloads the save as a .json file to the player's device (their Downloads
// folder). Works everywhere, and is the safety net if browser data is cleared.
function exportSave(){
  const blob = new Blob([JSON.stringify(serializeState(), null, 2)], {type: 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'java-quest-save-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  showToast('BACKUP EXPORTED', 'Save file downloaded to your device.');
}

// Reads a backup file the player picked and replaces current progress with it.
function importSave(file){
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!confirm('Replace your current progress with this backup?')) return;
      applySave(data);
      render();       // repaints everything and auto-saves the imported data
      showToast('BACKUP RESTORED', 'Welcome back, ' + state.name + '.');
    } catch (e) {
      showToast('IMPORT FAILED', 'That file is not a valid Java Quest save.');
    }
  };
  reader.readAsText(file);
}

/* ============ MAXED EDITION ============ */
// This copy of Java Quest starts with EVERYTHING finished: every lesson
// cleared, every boss defeated (so all six Gates are open and you are S-Rank),
// a high level, and all stat points already spent. Change MAXED_LEVEL below to
// make the hunter weaker or stronger — the game has no level cap, so 50 is just
// a sensible "maxed" number that keeps the XP numbers readable.
const MAXED_LEVEL = 50;

// Fills `state` with the fully maxed hunter. Used on first launch (when there
// is no save yet) and by the RESTORE MAXED STATE button.
function buildMaxedState(){
  // Every quest in every Gate cleared, and every Gate's boss defeated.
  state.cleared = new Set();
  GATES.forEach((g, gi) => g.quests.forEach((q, qi) => state.cleared.add(gi + '-' + qi)));
  state.bossCleared = new Set(GATES.map((g, gi) => gi));

  // Level: replay the exact XP curve the game uses (each level needs 22% more XP).
  state.level = 1;
  state.xpNext = 100;
  while (state.level < MAXED_LEVEL){
    state.level++;
    state.xpNext = Math.round(state.xpNext * 1.22);
  }
  state.xp = Math.floor(state.xpNext * 0.9);          // bar nearly full

  // Every level-up gives 3 stat points. Spend ALL of them, spread evenly.
  const points = (MAXED_LEVEL - 1) * 3;
  state.stats = {LOGIC:1, SYNTAX:1, STRUCT:1, DEBUG:1};
  const order = ['LOGIC', 'SYNTAX', 'STRUCT', 'DEBUG'];
  for (let i = 0; i < points; i++) state.stats[order[i % 4]]++;
  state.statPoints = 0;

  state.name = 'Player';
  state.dailyUsed = false;                             // Daily Quest still available to play
  state.openGate = 0;
  state.rankIdx = rankFromBosses();                    // all bosses cleared -> S-Rank
}

// In this edition "reset" means "put everything back to maxed" (after asking).
function resetProgress(){
  if (!confirm('Restore everything to the fully maxed state? Your current progress will be replaced.')) return;
  buildMaxedState();
  render();
  setView('home');
  showToast('MAXED STATE RESTORED', 'Every Gate cleared. Level ' + state.level + '.');
}

// Load a saved game if there is one; on the very first launch there isn't,
// so start from the maxed hunter instead of a Level 1 beginner.
loadedFromSave = loadGame();
if (!loadedFromSave) buildMaxedState();

/* ============ RENDER ============ */
// 1234567 -> "1,234,567" (a maxed hunter's XP numbers get big).
function fmtNum(n){ return Number(n).toLocaleString('en-US'); }

// Shorthand used everywhere a rank LETTER (not the full rank object) is needed —
// e.g. "E", "S" — for badges and headings.
function fmtRank(){ return RANK_META[state.rankIdx].rank; }

// The main re-render pass. Called after every state change (XP gained, quest
// cleared, stat point spent, name changed, etc.) — it's not surgical, it just
// re-paints every piece of UI that depends on `state` from scratch each time.
// Cheap enough for an app this size, and it means every screen always stays
// in sync without separate update logic per feature.
function render(){
  state.rankIdx = rankFromBosses(); // keep rank in sync with boss clears (see SAVE / LOAD)
  // --- Status view: name, job title, and rank badge ---
  document.getElementById('pName').textContent = state.name.toUpperCase();
  document.getElementById('pJob').textContent = 'Job: ' + RANK_META[state.rankIdx].job;
  document.getElementById('rankHex').textContent = fmtRank();
  document.getElementById('rankHex').style.color = RANK_META[state.rankIdx].color;       // hex badge recolors per rank
  document.getElementById('rankHex').style.borderColor = RANK_META[state.rankIdx].color;
  document.getElementById('rankName').textContent = fmtRank() + '-Rank · Lv. ' + state.level;

  // --- Status view: XP bar (fill % = how close to the next level) ---
  document.getElementById('xpText').textContent = fmtNum(state.xp) + ' / ' + fmtNum(state.xpNext);
  document.getElementById('xpBar').style.width = Math.min(100, (state.xp/state.xpNext*100)) + '%';

  // --- Home view quick-glance readout: a condensed duplicate of the above,
  // so the player can see their progress without leaving the Home screen ---
  const homeHex = document.getElementById('homeRankHex');
  homeHex.textContent = fmtRank();
  homeHex.style.color = RANK_META[state.rankIdx].color;
  homeHex.style.borderColor = RANK_META[state.rankIdx].color;
  document.getElementById('homeNameLine').textContent = `${state.name.toUpperCase()} · ${fmtRank()}-Rank · Lv. ${state.level}`;
  document.getElementById('homeXpText').textContent = fmtNum(state.xp) + ' / ' + fmtNum(state.xpNext) + ' XP';
  document.getElementById('homeXpBar').style.width = Math.min(100, (state.xp/state.xpNext*100)) + '%';

  // --- Status view: the 4 allocatable RPG stats ---
  // Rebuilds the whole stat list from state.stats every render, and the "+"
  // button is only enabled while the player has unspent statPoints. Clicking
  // "+" bumps that one stat, spends a point, then re-renders to refresh the
  // button's disabled state (e.g. the last point spent greys out every button).
  const statsBox = document.getElementById('statsBox');
  // Each row shows: the stat, what it DOES, its current effect, and (when you
  // have points to spend) what the next point would change it to.
  const fxNow = statEffects(state.stats, state.level);
  statsBox.innerHTML = Object.keys(state.stats).map(k => {
    const info = STAT_INFO[k];
    const fxNext = statEffects({...state.stats, [k]: state.stats[k] + 1}, state.level);
    const nowTxt = statEffectText(k, fxNow), nextTxt = statEffectText(k, fxNext);
    const preview = (state.statPoints > 0 && nextTxt !== nowTxt) ? ` <span class="next">→ ${nextTxt}</span>` : '';
    return `
    <div class="row stat">
      <div class="stat-left">
        <span class="stat-name">${info.icon} ${info.label}</span>
        <span class="stat-what">${info.what}</span>
        <span class="stat-effect">${nowTxt}${preview}</span>
      </div>
      <div class="stat-right">
        <span class="stat-val">${state.stats[k]}</span>
        <button class="plus" data-stat="${k}" ${state.statPoints<=0?'disabled':''}>+</button>
      </div>
    </div>`;
  }).join('');
  statsBox.querySelectorAll('.plus').forEach(b => b.onclick = () => {
    state.stats[b.dataset.stat]++; // spend the point: raise the chosen stat by 1...
    state.statPoints--;            // ...and remove it from the unspent pool
    render();
  });
  document.getElementById('pointsNote').textContent = state.statPoints>0 ? `${state.statPoints} STAT POINT${state.statPoints>1?'S':''} AVAILABLE` : '';

  // --- Status view: Daily Quest button reflects whether it's already been claimed today ---
  const dailyBtn = document.getElementById('dailyBtn');
  dailyBtn.disabled = state.dailyUsed;
  dailyBtn.textContent = state.dailyUsed ? 'DAILY QUEST CLEARED' : 'ACCEPT DAILY QUEST';

  // --- Rebuild the two content-heavy views that depend on cleared/bossCleared ---
  renderGates();          // Dungeons view: the Gate → quest → Boss map
  renderLessonLibrary();  // Lessons view: the browsable lesson list
  saveGame();             // auto-save after every change so progress is never lost
}

/* ============ NAVIGATION ============ */
// Simple single-page "router": all four screens (home/dungeons/lessons/status)
// already exist in the DOM at once (see index.html, .view sections) — switching
// views is just toggling which one has the .active class (CSS shows only that
// one; see .view / .view.active in style.css). No page reloads, no routing library.
function setView(name){
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active')); // hide every view...
  document.getElementById('view-' + name).classList.add('active');              // ...then show only the target one
  document.querySelectorAll('.navtab').forEach(t => t.classList.toggle('active', t.dataset.view === name)); // highlight the matching tab
  window.scrollTo({top:0, behavior:'smooth'}); // start the new view at the top, not mid-scroll from the last one
}
// Top nav bar tabs (Home/Dungeons/Lessons/Status) each carry a data-view
// attribute naming which screen they open.
document.querySelectorAll('.navtab').forEach(tab => {
  tab.onclick = () => setView(tab.dataset.view);
});
// The three big cards on the Home screen double as navigation shortcuts —
// same setView() call, just triggered by a data-goto attribute instead.
document.querySelectorAll('[data-goto]').forEach(card => {
  card.onclick = () => setView(card.dataset.goto);
});

/* ============ LESSON LIBRARY ============ */
// Builds the "Lessons" view: a read-only-ish index of every quest the player
// can revisit. Unlike the Dungeons view, individual quests here are never
// locked (if the Gate is unlocked, every lesson in it is browsable regardless
// of clear status) — the only gate on content here is the Gate itself.
function renderLessonLibrary(){
  const box = document.getElementById('lessonLibrary');
  box.innerHTML = '';
  GATES.forEach((gate, gi) => {
    const meta = RANK_META[gi];
    // Same unlock rule as the Dungeon map: Gate 0 is always open; any later
    // Gate requires the previous Gate's Boss to be in bossCleared.
    const unlocked = gi === 0 || state.bossCleared.has(gi-1);
    const wrap = document.createElement('div');
    wrap.className = 'lib-gate';

    if (!unlocked){
      // Sealed Gate: show its rank/name as a locked placeholder, no quest list —
      // keeps later content from being spoiled/skippable via the library tab.
      wrap.innerHTML = `
        <div class="lib-head" style="--rc:${meta.color}">
          <div class="lib-rank">${meta.rank}</div>
          <div class="lib-title">${meta.name}</div>
        </div>
        <div class="lib-sealed">🔒 Clear the previous Gate's Boss in Dungeons to unlock these lessons.</div>`;
      box.appendChild(wrap);
      return;
    }

    // Unlocked Gate: list every quest as a clickable card. "done" just adds a
    // checkmark via CSS (see .lib-item.done) — it's cosmetic here, re-clicking
    // a cleared quest still works and just reopens its lesson + trial.
    const items = gate.quests.map((q, qi) => {
      const done = state.cleared.has(gi + '-' + qi);
      return `<div class="lib-item ${done ? 'done' : ''}" data-g="${gi}" data-q="${qi}">
        <div class="lt">${q.title}</div>
        <div class="ltag">${q.tag}</div>
      </div>`;
    }).join('');
    wrap.innerHTML = `
      <div class="lib-head" style="--rc:${meta.color}">
        <div class="lib-rank">${meta.rank}</div>
        <div class="lib-title">${meta.name}</div>
      </div>
      <div class="lib-grid">${items}</div>`;
    // Clicking any card opens the exact same modal flow as the Dungeons view —
    // this is just a second entry point into openQuestModal(), not a separate system.
    wrap.querySelectorAll('.lib-item').forEach(item => {
      item.onclick = () => openQuestModal(parseInt(item.dataset.g), parseInt(item.dataset.q));
    });
    box.appendChild(wrap);
  });
}

// Builds the "Dungeons" view: the Gate → Quest → Boss progression map.
// This is where the actual rank-gating rules live — three separate "locked"
// concepts are computed fresh every render:
//   1) unlocked     — can this WHOLE Gate be opened at all?
//   2) bossUnlocked — have all quests inside it been cleared, so its Boss is fightable?
//   3) isOpen       — is this Gate's quest list currently expanded in the UI?
// None of these are stored directly on the gate — they're derived each time
// from state.bossCleared / state.cleared / state.openGate, so the map always
// reflects the true current progress with no separate sync step needed.
function renderGates(){
  const box = document.getElementById('gates');
  box.innerHTML = '';
  GATES.forEach((gate, gi) => {
    const meta = RANK_META[gi];
    // THE core progression rule: Gate 0 (E-Rank) is always open. Every other
    // Gate stays sealed until the PREVIOUS Gate's boss index appears in
    // bossCleared — this is what makes rank-up feel like breaking a seal
    // rather than just hitting a level number.
    const unlocked = gi === 0 || state.bossCleared.has(gi-1);
    // Boss only becomes fightable once EVERY quest in this gate is cleared —
    // .every() returns false the moment one quest is missing from state.cleared.
    const bossUnlocked = gate.quests.every((_, qi) => state.cleared.has(gi+'-'+qi));
    const bossDone = state.bossCleared.has(gi);
    const isOpen = state.openGate === gi;

    const el = document.createElement('div');
    // CSS classes drive the visual locked/open states — see .gate.locked and
    // .gate.open in style.css for the actual dimming/expand styling.
    el.className = 'gate' + (unlocked ? '' : ' locked') + (isOpen ? ' open' : '');
    el.innerHTML = `
      <div class="gate-head" style="--rc:${meta.color}">
        <div class="gate-rank">${meta.rank}</div>
        <div>
          <div class="gate-title">${gate.quests===GATES[gi].quests ? meta.name : meta.name}</div>
          <div class="gate-sub">${unlocked ? gate.quests.filter((_,qi)=>state.cleared.has(gi+'-'+qi)).length + ' / ' + gate.quests.length + ' quests cleared' : 'SEALED'}</div>
        </div>
        <div class="gate-lock">${unlocked ? (bossDone ? 'CLEARED ✓' : '') : '🔒 LOCKED'}</div>
        <div class="chevron">▶</div>
      </div>
      <div class="quest-path">
        ${gate.quests.map((q, qi) => {
          const done = state.cleared.has(gi+'-'+qi);
          return `<div class="qnode ${done?'done':''}" data-g="${gi}" data-q="${qi}">
            <span class="qi">${done ? '✓' : (qi+1).toString().padStart(2,'0')}</span>
            <span class="qt">${q.title}</span>
            <span class="qtag">${q.tag}</span>
          </div>`;
        }).join('')}
        <div class="boss-node ${bossUnlocked?'':'locked'} ${bossDone?'done':''}" data-g="${gi}" data-boss="1">
          <span class="skull">☠ BOSS</span>
          <span class="bname">${gate.boss.title}</span>
          <span class="qtag" style="margin-left:auto;">${bossDone ? 'DEFEATED' : (bossUnlocked ? gate.boss.tag : 'Clear all quests first')}</span>
        </div>
      </div>
    `;
    // Clicking a Gate's header expands/collapses its quest list. Clicking a
    // SEALED gate instead shows a "still locked" toast and does nothing else.
    el.querySelector('.gate-head').onclick = () => {
      if (!unlocked) { flashLockedGate(); return; }
      state.openGate = isOpen ? -1 : gi; // toggle: close it if already open, otherwise open this one
      renderGates();
    };
    // Each quest node opens its own lesson+trial modal when clicked.
    // stopPropagation keeps the click from also toggling the Gate header
    // open/closed underneath it.
    el.querySelectorAll('.qnode').forEach(node => {
      node.onclick = (e) => { e.stopPropagation(); openQuestModal(parseInt(node.dataset.g), parseInt(node.dataset.q)); };
    });
    // The Boss node only actually opens its modal if bossUnlocked — otherwise
    // the click is just silently ignored (the UI already shows it as locked).
    const bossEl = el.querySelector('.boss-node');
    bossEl.onclick = (e) => {
      e.stopPropagation();
      if (!bossUnlocked) return;
      openBossModal(gi);
    };
    box.appendChild(el);
  });
}

// Small feedback toast shown when the player clicks a Gate that's still sealed —
// just explains the rule (clear the previous Boss) rather than doing nothing silently.
function flashLockedGate(){
  showToast('GATE SEALED', 'Clear the previous Gate\'s Boss to break this seal.');
}

/* ============ QUEST MODAL ============ */
// Opens a regular quest: 15 XP per correct answer (3 per drill), +50 XP bonus only if every
// question in the quest is answered correctly on this attempt (see
// renderQuizStage's allCorrect check for where that bonus is actually paid out).
// onFullClear marks this specific quest ("gateIdx-questIdx") as done, which is
// what feeds the Gate's "cleared" count AND the bossUnlocked check in renderGates().
function openQuestModal(gi, qi){
  const gate = GATES[gi];
  const quest = gate.quests[qi];
  buildModal(quest, gate.quests[qi].tag, () => {
    state.cleared.add(gi+'-'+qi);
    render();
  }, 15, 50);
}
/* ============ DUNGEON BOSS BATTLE ============ */
// Boss fights are NOT the quiz modal. They're a turn-based battle:
//   - every correct answer hits the boss (boss HP goes down)
//   - every wrong answer hits YOU (player HP goes down) and that question
//     goes back to the end of the line, so you can't win without eventually
//     answering everything correctly
//   - boss HP hits 0 -> victory (Gate unlocks); your HP hits 0 -> defeat (retry)

// Extra questions mixed into each Gate's boss pool (index = gate index) so a
// boss fight is longer and tougher than just reusing the 3-4 questions in GATES.
const BOSS_EXTRA = [
  [ // E
    {q:"Which of these is NOT a primitive type in Java?", c:["int","boolean","String","char"], a:2, e:"String is a class (an object), not a primitive. Primitives are int, double, boolean, char, and a few others."},
    {q:"What does System.out.println(10 + 5 + \"Hi\"); print?", c:["105Hi","15Hi","10 5 Hi","It won't compile"], a:1, e:"Java evaluates left to right: 10 + 5 = 15 first, then 15 + \"Hi\" joins into the text 15Hi."},
    {q:"What must every Java statement end with?", c:["A period","A semicolon","A colon","Nothing"], a:1, e:"Statements end with a semicolon ; — forgetting one is the classic beginner compile error."}
  ],
  [ // D
    {q:"What does 'continue' do inside a loop?", c:["Exits the loop completely","Skips the rest of this pass and jumps to the next one","Restarts the program","Pauses the loop"], a:1, e:"continue skips whatever is left in the current iteration and moves straight to the next iteration."},
    {q:"int i = 10; while (i < 5) { ... } — how many times does the body run?", c:["0","1","5","Forever"], a:0, e:"The condition is false from the very start, and a while loop checks BEFORE running, so the body never runs."},
    {q:"Which part of an if statement runs only when the condition is false?", c:["else","case","break","default"], a:0, e:"else is the fallback branch that runs when the if condition is false."}
  ],
  [ // C
    {q:"What is the index of the LAST element in an array of length 5?", c:["5","4","6","1"], a:1, e:"Indexes start at 0, so a length-5 array has indexes 0,1,2,3,4. The last one is length - 1."},
    {q:"What does \"Java\".substring(0, 2) return?", c:["Ja","Jav","av","J"], a:0, e:"substring(start, end) includes start and excludes end, so it takes indexes 0 and 1: Ja."},
    {q:"Which ArrayList method returns how many elements it holds?", c:["length","size()","count()","length()"], a:1, e:"ArrayList uses .size(). Arrays use .length (no parentheses) and Strings use .length()."}
  ],
  [ // B
    {q:"What happens if you write a class with no constructor at all?", c:["Compile error","Java supplies a default no-argument constructor","The class can't be used","Fields get random values"], a:1, e:"If you declare no constructors, Java quietly provides a default one with no parameters."},
    {q:"Which access modifier makes a member visible to every other class?", c:["private","protected","public","static"], a:2, e:"public means accessible from anywhere. private restricts it to the class itself."},
    {q:"Inside a constructor, what does 'this' refer to?", c:["The class itself","The object currently being created","The superclass","The main method"], a:1, e:"this is a reference to the current object — the one the constructor is building."}
  ],
  [ // A
    {q:"Can a Java class extend more than one class?", c:["Yes, as many as it wants","No — one superclass only (but it can implement many interfaces)","Only abstract classes can","Only inside the same package"], a:1, e:"Java allows single class inheritance, but a class can implement any number of interfaces."},
    {q:"Which keyword lets a subclass call its parent class's constructor or method?", c:["parent","base","super","this"], a:2, e:"super refers to the parent class, e.g. super(args) calls the parent constructor."},
    {q:"A class implements an interface but skips one of its methods. What must the class be?", c:["static","abstract","final","private"], a:1, e:"A class that doesn't implement every interface method has to be declared abstract itself."}
  ],
  [ // S
    {q:"Which exception is thrown when you use an array index that doesn't exist?", c:["NullPointerException","ArrayIndexOutOfBoundsException","ArithmeticException","IOException"], a:1, e:"Going past the end of an array throws ArrayIndexOutOfBoundsException."},
    {q:"Which Map method retrieves a value using its key?", c:["fetch()","get()","find()","read()"], a:1, e:"map.get(key) returns the value stored under that key (or null if there isn't one)."},
    {q:"What gets thrown when you call a method on a null reference?", c:["ArithmeticException","NullPointerException","ClassCastException","StackOverflowError"], a:1, e:"Calling a method on null throws a NullPointerException — one of the most common Java errors."}
  ]
];

// Escapes text before putting it into innerHTML. Quiz text contains things like
// List<String> and <!-- comment --> which the browser would otherwise treat as
// real HTML tags and silently swallow.
function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Fisher-Yates shuffle (returns a new array). Used to randomize both the
// question order and the answer order each fight so it can't be memorized.
function shuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Draws the boss as inline SVG so it needs no image files. Each Gate's boss
// looks a bit scarier than the last: horns appear at D, shoulder spikes at C,
// a third eye at A, and a golden crown for the S-Rank Shadow Monarch.
function bossArt(gi, color){
  const eyeXs = gi >= 4 ? [80,100,120] : [86,114];
  const eyes = eyeXs.map(x => `<ellipse class="eye" cx="${x}" cy="86" rx="5" ry="3.5" fill="${color}"/>`).join('');
  const horns = gi >= 1
    ? `<path d="M72 64 Q56 38 62 18 Q78 40 88 60Z" fill="${color}" opacity=".85"/><path d="M128 64 Q144 38 138 18 Q122 40 112 60Z" fill="${color}" opacity=".85"/>` : '';
  const spikes = gi >= 2
    ? `<path d="M46 132 L26 104 L60 118Z" fill="${color}" opacity=".7"/><path d="M154 132 L174 104 L140 118Z" fill="${color}" opacity=".7"/>` : '';
  const claws = gi >= 3
    ? `<path d="M40 190 L34 160 L52 176Z" fill="${color}" opacity=".6"/><path d="M160 190 L166 160 L148 176Z" fill="${color}" opacity=".6"/>` : '';
  const crown = gi === 5
    ? `<path d="M76 54 L84 36 L92 52 L100 30 L108 52 L116 36 L124 54Z" fill="#f5c542"/>` : '';
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <polygon class="aura" points="100,8 180,54 180,146 100,192 20,146 20,54" fill="none" stroke="${color}" stroke-width="1.5" opacity=".35"/>
    <path d="M48 192 Q40 112 100 72 Q160 112 152 192Z" fill="#0a0f1d" stroke="${color}" stroke-width="2"/>
    ${spikes}${claws}
    <path d="M70 100 Q66 62 100 54 Q134 62 130 100 Q116 114 100 114 Q84 114 70 100Z" fill="#05080f" stroke="${color}" stroke-width="2"/>
    ${horns}${crown}${eyes}
    <path d="M86 104 L92 98 L98 104 L104 98 L110 104 L114 99" fill="none" stroke="${color}" stroke-width="2"/>
  </svg>`;
}

// Opens the boss battle for Gate `gi`. Everything about the fight (queue, HP,
// win/lose) lives in this closure, so each new fight starts completely fresh.
function openBossModal(gi){
  const boss = GATES[gi].boss;
  const meta = RANK_META[gi];
  const pool = boss.questions.concat(BOSS_EXTRA[gi] || []);

  // --- Battle numbers ---
  const HIT = 100;                                    // damage the boss takes per correct answer
  const bossMax = pool.length * HIT;                  // boss HP = one hit per question in its pool
  const fxNow = statEffects(state.stats, state.level); // what your stats give you in this fight
  const heroMax = fxNow.maxHp;                        // STRUCTURE (and level) set your max HP
  // Damage you take per wrong answer: harder Gates hit harder, but each point
  // you've put into DEBUG softens it (never below 5).
  const dmgTaken = Math.max(5, 20 + gi * 3 - fxNow.dmgCut);
  const firstClear = !state.bossCleared.has(gi);      // clear bonuses only pay out the first time
  let flawless = true;                               // shared with victory(): true if you finished without taking damage
  let hitCount = 0;                                  // hit-equivalents landed (a critical hit counts as 2) — shared with victory()
  let correctCount = 0;                              // questions answered correctly
  let critCount = 0;                                 // critical hits landed

  const box = document.getElementById('modalBox');
  const content = document.getElementById('modalContent');
  box.classList.add('battle');                        // widens the modal for the arena layout
  document.getElementById('overlay').classList.add('show');

  showIntro();

  // ---------- SCREEN 1: intro ----------
  function showIntro(){
    content.innerHTML = `
      <div class="mtag">☠ DUNGEON BOSS — ${esc(boss.tag)}</div>
      <div class="boss-art" style="--bc:${meta.color}">${bossArt(gi, meta.color)}</div>
      <h3 class="boss-title" style="color:${meta.color}">${esc(boss.title)}</h3>
      <div class="lesson boss-flavor">${esc(boss.lesson)}</div>
      <div class="battle-rules">
        <div><b>${bossMax}</b><span>BOSS HP</span></div>
        <div><b>${heroMax}</b><span>YOUR HP</span></div>
        <div><b>-${dmgTaken}</b><span>PER MISTAKE</span></div>
        <div><b>${Math.round(fxNow.crit * 100)}%</b><span>⚡ CRIT CHANCE</span></div>
        <div><b>${fxNow.analyze}</b><span>🧠 ANALYZE</span></div>
      </div>
      <p class="battle-tip">Correct answer = you strike. Wrong answer = the boss strikes you, and you'll face that question again. Your stats power you up here: <b>STRUCTURE</b> = more HP, <b>DEBUG</b> = less damage taken, <b>SYNTAX</b> = critical hits, <b>LOGIC</b> = Analyze (removes 2 wrong answers).</p>
      <div class="modal-actions">
        <button class="btn danger" id="closeBtn">RETREAT</button>
        <button class="btn solid" id="fightBtn">ENTER THE FIGHT →</button>
      </div>`;
    content.querySelector('#closeBtn').onclick = closeModal;
    content.querySelector('#fightBtn').onclick = startBattle;
  }

  // ---------- SCREEN 2: the battle ----------
  function startBattle(){
    let queue = shuffle(pool);       // questions still to be answered correctly (front = current)
    let bossHp = bossMax;
    let heroHp = heroMax;
    flawless = true;                 // reset each attempt; stays true only if you never get hit
    let analyzeLeft = fxNow.analyze; // LOGIC: Analyze charges left this fight
    hitCount = 0; correctCount = 0; critCount = 0;   // reset the per-attempt counters (declared above, shared with victory())

    content.innerHTML = `
      <div class="mtag">☠ ${esc(boss.tag)}</div>
      <div class="arena" style="--bc:${meta.color}">
        <div class="hp-row">
          <span class="hp-label">${esc(boss.title.toUpperCase())}</span>
          <div class="hp-track"><div class="hp-fill boss" id="bossHpFill"></div></div>
          <span class="hp-num" id="bossHpNum"></span>
        </div>
        <div class="boss-stage">
          <div class="boss-art" id="bossArtEl">${bossArt(gi, meta.color)}</div>
          <div id="fxLayer"></div>
        </div>
        <div class="hp-row hero" id="heroRow">
          <span class="hp-label">YOU</span>
          <div class="hp-track"><div class="hp-fill hero" id="heroHpFill"></div></div>
          <span class="hp-num" id="heroHpNum"></span>
        </div>
        <div class="battle-log" id="battleLog">The boss awaits. Answer to strike.</div>
        <div class="battle-chips" id="battleChips"></div>
        <div id="battleQ"></div>
      </div>
      <div class="modal-actions">
        <button class="btn danger" id="closeBtn">RETREAT</button>
        <button class="btn solid" id="nextBtn" style="display:none"></button>
      </div>`;

    const artEl = content.querySelector('#bossArtEl');
    const fx = content.querySelector('#fxLayer');
    const log = content.querySelector('#battleLog');
    const qBox = content.querySelector('#battleQ');
    const nextBtn = content.querySelector('#nextBtn');
    content.querySelector('#closeBtn').onclick = closeModal;

    // The little stat-perk readout above the question (only shows perks you have).
    function updateChips(){
      const chips = [];
      if (fxNow.analyze > 0) chips.push(`<span>🧠 ANALYZE ×${analyzeLeft}</span>`);
      if (fxNow.crit > 0)    chips.push(`<span>⚡ CRIT ${Math.round(fxNow.crit * 100)}%</span>`);
      if (fxNow.dmgCut > 0)  chips.push(`<span>🐞 −${fxNow.dmgCut} DMG TAKEN</span>`);
      if (state.stats.STRUCT > 1) chips.push(`<span>🛡 ${heroMax} MAX HP</span>`);
      content.querySelector('#battleChips').innerHTML = chips.length
        ? chips.join('')
        : '<span class="muted">Spend stat points in STATUS to gain battle perks</span>';
    }

    // Redraws both HP bars. Your bar turns red and pulses when you're low.
    function updateBars(){
      content.querySelector('#bossHpFill').style.width = (bossHp / bossMax * 100) + '%';
      content.querySelector('#bossHpNum').textContent = bossHp + ' / ' + bossMax;
      const hf = content.querySelector('#heroHpFill');
      hf.style.width = (heroHp / heroMax * 100) + '%';
      hf.classList.toggle('low', heroHp / heroMax <= 0.3);
      content.querySelector('#heroHpNum').textContent = heroHp + ' / ' + heroMax;
    }

    // Floating damage number that drifts up and fades (see .dmg in style.css).
    function floatDmg(text, cls, parent){
      const s = document.createElement('span');
      s.className = 'dmg ' + cls;
      s.textContent = text;
      parent.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }

    // Restarts a CSS animation class (removing then re-adding it, with a
    // forced reflow in between) so repeated hits each replay the effect.
    function replay(el, cls, ms){
      el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
      setTimeout(() => el.classList.remove(cls), ms);
    }

    // Shows the current question (the front of the queue) as clickable answer buttons.
    function ask(){
      nextBtn.style.display = 'none';
      const q = queue[0];
      // Shuffle the answers, remembering which one is correct via an `ok` flag.
      const choices = shuffle(q.c.map((t, i) => ({t, ok: i === q.a})));
      qBox.innerHTML = `
        <div class="qtext">${esc(q.q)}</div>
        ${analyzeLeft > 0 ? `<button class="btn analyze-btn" id="analyzeBtn">🧠 ANALYZE (${analyzeLeft} left)</button>` : ''}
        ${choices.map((c, i) => `<button class="bchoice" data-i="${i}">${esc(c.t)}</button>`).join('')}
        <div class="b-explain" id="bExplain"></div>`;
      qBox.querySelectorAll('.bchoice').forEach(btn => {
        btn.onclick = () => answer(q, choices, parseInt(btn.dataset.i));
      });
      // LOGIC perk: spend one charge to cross out two wrong answers on this question.
      const analyzeBtn = qBox.querySelector('#analyzeBtn');
      if (analyzeBtn) analyzeBtn.onclick = () => {
        const wrongIdx = choices.map((c, i) => i).filter(i => !choices[i].ok);
        pickEliminations(wrongIdx).forEach(i => {
          const b = qBox.querySelector(`.bchoice[data-i="${i}"]`);
          b.disabled = true;
          b.classList.add('eliminated');
        });
        analyzeLeft--;
        analyzeBtn.remove();                          // one use per question
        log.textContent = '🧠 Analyze: two wrong answers ruled out.';
        updateChips();
      };
      updateChips();
    }

    // Resolves one answer: lock the buttons, show right/wrong, then apply damage.
    function answer(q, choices, pickedIdx){
      const btns = qBox.querySelectorAll('.bchoice');
      btns.forEach((b, i) => {
        b.disabled = true;
        if (choices[i].ok) b.classList.add('correct');
        else if (i === pickedIdx) b.classList.add('wrong');
      });
      const explain = qBox.querySelector('#bExplain');
      explain.textContent = q.e;
      explain.style.display = 'block';
      const ab = qBox.querySelector('#analyzeBtn'); if (ab) ab.remove(); // too late to analyze

      if (choices[pickedIdx].ok){
        // ----- CORRECT: you hit the boss -----
        queue.shift();                                  // this question is done for good
        correctCount++;
        // SYNTAX perk: roll for a critical hit — double damage, and it counts
        // as two hits for XP so crits never cost you rewards.
        const crit = Math.random() < fxNow.crit;
        const dmg = crit ? HIT * CRIT_MULT : HIT;
        hitCount += crit ? 2 : 1;
        if (crit) critCount++;
        bossHp = Math.max(0, bossHp - dmg);
        replay(artEl, 'hit', 450);
        floatDmg(crit ? 'CRIT! -' + dmg : '-' + dmg, crit ? 'boss crit' : 'boss', fx);
        log.textContent = crit
          ? '⚡ CRITICAL HIT! You smash the ' + boss.title + ' for ' + dmg + ' HP!'
          : 'You strike the ' + boss.title + '! -' + dmg + ' HP';
        updateBars();
        if (bossHp <= 0){
          setTimeout(() => artEl.classList.add('dead'), 450); // boss collapses
          nextBtn.textContent = 'CLAIM VICTORY ▸';
          nextBtn.onclick = victory;
        } else {
          nextBtn.textContent = 'NEXT ▸';
          nextBtn.onclick = ask;
        }
      } else {
        // ----- WRONG: the boss hits you, and the question comes back later -----
        queue.push(queue.shift());                      // move it to the back of the line
        flawless = false;
        heroHp = Math.max(0, heroHp - dmgTaken);
        replay(box, 'hurt', 500);                       // shakes the whole window + red flash
        floatDmg('-' + dmgTaken, 'hero', content.querySelector('#heroRow'));
        log.textContent = 'The ' + boss.title + ' strikes you! -' + dmgTaken + ' HP';
        updateBars();
        if (heroHp <= 0){
          nextBtn.textContent = 'YOU HAVE FALLEN ▸';
          nextBtn.onclick = defeat;
        } else {
          nextBtn.textContent = 'NEXT ▸';
          nextBtn.onclick = ask;
        }
      }
      nextBtn.style.display = 'inline-block';
    }

    updateBars();
    ask();
  }

  // ---------- SCREEN 3a: victory ----------
  function victory(){
    // XP: every question in the pool counts as a hit (25 each). The big
    // clear bonus (+150) and flawless bonus (+50) only pay on the FIRST
    // time you beat this boss, so rematches can't be farmed for XP.
    const hitsXp = Math.min(hitCount, pool.length) * 25;   // crits count as 2 hits, so they never lose XP
    const clearXp = firstClear ? 150 : 0;
    const flawlessXp = (firstClear && flawless) ? 50 : 0;
    const total = hitsXp + clearXp + flawlessXp;
    const hadNext = gi < GATES.length - 1;

    state.bossCleared.add(gi);          // THIS is what unlocks the next Gate
    gainXP(total);                      // also re-renders every screen

    content.innerHTML = `
      <div class="mtag">☠ ${esc(boss.tag)}</div>
      <div class="boss-art dead" style="--bc:${meta.color}">${bossArt(gi, meta.color)}</div>
      <h3 class="boss-title victory">BOSS DEFEATED</h3>
      <div class="reward-list">
        <div><span>${correctCount} correct answer${correctCount === 1 ? '' : 's'}${critCount ? ' (' + critCount + ' ⚡ critical)' : ''}</span><b>+${hitsXp} XP</b></div>
        ${firstClear ? `<div><span>First clear bonus</span><b>+${clearXp} XP</b></div>` : ''}
        ${flawlessXp ? `<div><span>Flawless — no damage taken</span><b>+${flawlessXp} XP</b></div>` : ''}
        <div class="total"><span>TOTAL</span><b>+${total} XP</b></div>
      </div>
      <p class="battle-tip">${firstClear
        ? (hadNext ? 'The seal on the next Gate has been broken.' : 'Every Gate is cleared. You are the Shadow Monarch.')
        : 'Rematch complete. Bonus XP only pays out on the first clear.'}</p>
      <div class="modal-actions"><button class="btn solid" id="doneBtn">CONTINUE</button></div>`;
    content.querySelector('#doneBtn').onclick = closeModal;
    showToast('BOSS DEFEATED', '+' + total + ' XP earned');
  }

  // ---------- SCREEN 3b: defeat ----------
  function defeat(){
    content.innerHTML = `
      <div class="mtag">☠ ${esc(boss.tag)}</div>
      <div class="boss-art" style="--bc:#ff4d4d">${bossArt(gi, '#ff4d4d')}</div>
      <h3 class="boss-title defeat">YOU HAVE FALLEN</h3>
      <p class="battle-tip" style="text-align:center">No XP was lost, but none was earned either. Review the lessons, spend your stat points, and come back.</p>
      <div class="modal-actions">
        <button class="btn danger" id="closeBtn">RETREAT</button>
        <button class="btn solid" id="retryBtn">TRY AGAIN →</button>
      </div>`;
    content.querySelector('#closeBtn').onclick = closeModal;
    content.querySelector('#retryBtn').onclick = startBattle;   // fresh HP, reshuffled questions
  }
}

// Entry point for ANY modal in the game (quest, boss, or Daily Quest) — just
// kicks off the Lesson stage and reveals the overlay. All the reward/unlock
// parameters (onFullClear, perCorrect, clearBonus, isBoss, gi) are simply
// forwarded through to whichever stage needs them; buildModal itself doesn't
// use them.
function buildModal(quest, tag, onFullClear, perCorrect, clearBonus, isBoss, gi){
  document.getElementById('modalBox').classList.remove('battle');
  renderLessonStage(quest, tag, onFullClear, perCorrect, clearBonus, isBoss, gi);
  document.getElementById('overlay').classList.add('show');
}

// STAGE 1 of 2: the reading stage. Shows the teaching content (lesson text,
// an optional code example, an optional key-syntax bullet list) with no quiz
// yet — the player has to deliberately click through via "Begin Trial"/"Enter
// Boss Room" before any question appears. This is what makes the lessons feel
// like actual lessons rather than a caption the player skims past.
function renderLessonStage(quest, tag, onFullClear, perCorrect, clearBonus, isBoss, gi){
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="mtag">📖 LESSON — ${tag}</div>
    <h3>${quest.title}</h3>
    <div class="lesson">${quest.lesson}</div>
    ${quest.code ? `<div class="code">${quest.code.replace(/</g,'&lt;')}</div>` : ''}
    ${quest.points ? `
      <div class="keypoints">
        <div class="kp-head">KEY SYNTAX</div>
        <ul>${quest.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>` : ''}
    <div class="modal-actions">
      <button class="btn danger" id="closeBtn">RETREAT</button>
      <button class="btn solid" id="beginBtn">${isBoss ? 'ENTER BOSS ROOM' : (tag === 'DAILY QUEST' ? 'BEGIN TRIAL' : 'START DRILL')} →</button>
    </div>
  `;
  content.querySelector('#closeBtn').onclick = closeModal; // "Retreat" = bail out, no progress lost (nothing was ever at risk)
  content.querySelector('#beginBtn').onclick = () => renderQuizStage(quest, tag, onFullClear, perCorrect, clearBonus, isBoss, gi);
}

// STAGE 2 of 2: the quiz itself, plus ALL of the game's grading/reward logic.
// This single function handles: rendering the multiple-choice questions,
// grading the submission, awarding XP, deciding pass/fail, unlocking progress
// on a full clear, and wiring up a "Retry" loop on a partial clear.
// Normalizes a typed answer for comparison: trims, collapses runs of spaces, and
// drops one trailing semicolon. Case is deliberately NOT ignored.
function normAnswer(s){
  return String(s).trim().replace(/\s+/g, ' ').replace(/;$/, '').trim();
}

function renderQuizStage(quest, tag, onFullClear, perCorrect, clearBonus, isBoss, gi){
  const content = document.getElementById('modalContent');
  // `answered` flips to true only once the quest is fully cleared — while
  // true, the Submit button (now labeled "Continue") just closes the modal
  // instead of re-grading already-correct answers.
  let answered = false;
  // LOGIC perk: Analyze charges for this attempt (each removes 2 wrong answers
  // from one multiple-choice question). A retry re-renders this, so charges refresh.
  let analyzeLeft = statEffects(state.stats, state.level).analyze;
  const hasAnalyze = analyzeLeft > 0 && quest.questions.some(q => q.type !== 'fill');

  content.innerHTML = `
    <div class="mtag">${tag === 'DAILY QUEST' ? '⚔ TRIAL' : '✍ PRACTICE DRILL'} — ${tag}</div>
    <h3>${quest.title}</h3>
    ${tag === 'DAILY QUEST' ? '' : '<p class="drill-note">Read the code, work out the answer, and type or pick it. Get all of them right to clear the quest.</p>'}
    <div class="result-banner" id="resultBanner"></div>
    ${hasAnalyze ? `<div class="analyze-bar">🧠 LOGIC — <b id="analyzeCount">${analyzeLeft}</b> Analyze charge${analyzeLeft === 1 ? '' : 's'}: tap ANALYZE under a multiple-choice question to cross out 2 wrong answers.</div>` : ''}
    <div id="qList"></div>
    <div class="modal-actions">
      <button class="btn danger" id="closeBtn">RETREAT</button>
      <button class="btn solid" id="submitBtn">SUBMIT</button>
    </div>
  `;

  // Render one radio-button question block per entry in quest.questions.
  // Each choice <label> carries data-qi (question index) / data-ci (choice
  // index) so the grading step below can look them back up by position.
  const qList = content.querySelector('#qList');
  quest.questions.forEach((q, idx) => {
    const div = document.createElement('div');
    div.className = 'qwrap';
    // Three possible parts: the question text, an optional code snippet to read,
    // then EITHER a text box (type:'fill' — type the missing code) OR the usual
    // multiple-choice radio buttons.
    div.innerHTML = `
      <div class="qtext">${idx+1}. ${esc(q.q)}</div>
      ${q.code ? `<div class="code qcode">${esc(q.code)}</div>` : ''}
      ${q.type === 'fill'
        ? `<input type="text" class="fillbox" id="fill${idx}" placeholder="type your answer" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">`
        : q.c.map((choice, ci) => `
        <label class="choice" data-qi="${idx}" data-ci="${ci}">
          <input type="radio" name="q${idx}" value="${ci}"> <span>${esc(choice)}</span>
        </label>`).join('')}
      ${(hasAnalyze && q.type !== 'fill') ? `<button type="button" class="btn analyze-btn" data-qi="${idx}">🧠 ANALYZE</button>` : ''}
      <div class="explain" data-qi="${idx}">${esc(q.e)}</div>
    `;
    qList.appendChild(div);
  });

  content.querySelector('#closeBtn').onclick = closeModal;
  // Analyze buttons: cross out two wrong choices on that question and spend a charge.
  content.querySelectorAll('.analyze-btn').forEach(btn => {
    btn.onclick = () => {
      if (analyzeLeft <= 0) return;
      const idx = parseInt(btn.dataset.qi);
      const q = quest.questions[idx];
      const wrongIdx = q.c.map((c, i) => i).filter(i => i !== q.a);
      pickEliminations(wrongIdx).forEach(i => {
        const label = content.querySelector(`.choice[data-qi="${idx}"][data-ci="${i}"]`);
        label.classList.add('eliminated');
        const radio = label.querySelector('input');
        radio.checked = false;
        radio.disabled = true;
      });
      analyzeLeft--;
      btn.disabled = true;                                              // one use per question
      content.querySelector('#analyzeCount').textContent = analyzeLeft;
      if (analyzeLeft <= 0) content.querySelectorAll('.analyze-btn').forEach(b => b.disabled = true);
    };
  });
  // Pressing Enter inside a typed-answer box = clicking Submit
  content.querySelectorAll('.fillbox').forEach(inp => {
    inp.onkeydown = (e) => { if (e.key === 'Enter') content.querySelector('#submitBtn').click(); };
  });
  content.querySelector('#submitBtn').onclick = () => {
    if (answered) { closeModal(); return; } // already passed — Submit now just acts as Continue/Close
    content.querySelectorAll('.analyze-btn').forEach(b => b.style.display = 'none'); // too late to analyze

    // --- GRADING: walk every question, compare the checked radio to q.a
    // (the correct choice's index), and visually mark each option
    // correct/wrong + reveal its explanation, regardless of pass/fail. ---
    let correctCount = 0;
    quest.questions.forEach((q, idx) => {
      const explainEl = content.querySelector(`.explain[data-qi="${idx}"]`);
      let isRight;
      if (q.type === 'fill'){
        // Typed answer: right if it matches ANY accepted answer (extra spaces and a
        // trailing ; are ignored, but capitalization must match — Java is case-sensitive).
        const box = content.querySelector(`#fill${idx}`);
        isRight = q.answers.some(a => normAnswer(a) === normAnswer(box.value));
        box.classList.add(isRight ? 'correct' : 'wrong');
        box.readOnly = true;
        explainEl.textContent = 'Answer: ' + q.answers[0] + ' — ' + q.e; // always show the answer
      } else {
        const picked = content.querySelector(`input[name="q${idx}"]:checked`);
        const pickedVal = picked ? parseInt(picked.value) : -1; // -1 = left unanswered
        content.querySelectorAll(`.choice[data-qi="${idx}"]`).forEach(labelEl => {
          const ci = parseInt(labelEl.dataset.ci);
          if (ci === q.a) labelEl.classList.add('correct');          // always highlight the right answer
          else if (ci === pickedVal) labelEl.classList.add('wrong'); // highlight the player's wrong pick, if any
        });
        isRight = pickedVal === q.a;
      }
      explainEl.style.display = 'block'; // reveal the "why" for every question
      if (isRight) correctCount++;
    });

    // --- RESULT: a quest/boss only "clears" on a perfect score. Partial
    // credit still pays XP per correct answer (below), it just doesn't
    // unlock anything or grant the clear bonus. ---
    const total = quest.questions.length;
    const banner = content.querySelector('#resultBanner');
    const allCorrect = correctCount === total;
    banner.className = 'result-banner ' + (allCorrect ? 'pass' : 'fail');
    banner.textContent = allCorrect
      ? (isBoss ? `BOSS DEFEATED — ${correctCount}/${total} CORRECT` : `QUEST CLEAR — ${correctCount}/${total} CORRECT`)
      : `${correctCount}/${total} CORRECT — REVIEW AND TRY AGAIN`;

    // --- REWARDS ---
    gainXP(correctCount * perCorrect); // XP for every correct answer, pass or fail
    if (allCorrect){
      gainXP(clearBonus);   // bonus XP ONLY on a perfect clear
      onFullClear();        // the callback from openQuestModal/openBossModal — marks cleared/bossCleared and unlocks progress
      showToast(isBoss ? 'BOSS DEFEATED' : 'QUEST CLEAR', `+${correctCount*perCorrect + clearBonus} XP earned`);
      content.querySelector('#submitBtn').textContent = 'CONTINUE';
    } else {
      // --- RETRY: wipe the visual grading marks and re-render this exact
      // quiz stage from scratch so the player can try again immediately —
      // no penalty beyond not getting the clear bonus this attempt. ---
      content.querySelector('#submitBtn').textContent = 'RETRY';
      answered = false;
      content.querySelector('#submitBtn').onclick = () => {
        content.querySelectorAll('.choice').forEach(c => c.classList.remove('correct','wrong'));
        content.querySelectorAll('.explain').forEach(e => e.style.display='none');
        content.querySelectorAll('input[type=radio]').forEach(r => r.checked = false);
        banner.className = 'result-banner';
        renderQuizStage(quest, tag, onFullClear, perCorrect, clearBonus, isBoss, gi);
      };
      return; // skip the `answered = true` below — the quest isn't actually cleared yet
    }
    answered = true;
  };
}
// Hides the modal overlay. Used for both "Retreat" (bail out early) and, once
// a quest clears, as what "Continue" ultimately triggers via closeModal().
function closeModal(){
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('modalBox').classList.remove('battle'); // back to the normal narrow modal for quests
}

/* ============ DAILY QUEST ============ */
// A small pool of review questions spanning multiple ranks' worth of content —
// unlike GATES, these aren't tied to any one Gate's unlock state, so they're
// always available regardless of progress.
const DAILY_POOL = [
  {q:"What is the result of: int x = 5 + 3 * 2;", c:["16","11","10","13"], a:1, e:"Multiplication happens before addition: 3*2=6, then 5+6=11."},
  {q:"Which loop is best when you don't know the exact number of iterations in advance?", c:["for","while","do-nothing","switch"], a:1, e:"while loops run based on a condition, ideal when the iteration count isn't fixed."},
  {q:"What does 'private' access control primarily protect?", c:["Method speed","Uncontrolled outside access to a field","Memory size","Compilation time"], a:1, e:"private restricts a field or method to its own class, enforcing encapsulation."},
  {q:"In ArrayList<String> list, what type of elements can it hold?", c:["Only integers","Only String objects","Any type mixed freely","Only primitives"], a:1, e:"The generic type parameter <String> restricts the list to String objects."},
  {q:"What does try/catch primarily help you do?", c:["Speed up loops","Handle runtime errors gracefully","Declare variables","Import packages"], a:1, e:"try/catch lets your program respond to exceptions instead of crashing."}
];
document.getElementById('dailyBtn').onclick = () => {
  if (state.dailyUsed) return; // one claim per day — button is also disabled via render(), this is the hard stop
  // Pick ONE random question from the pool and wrap it in a minimal
  // quest-shaped object so it can flow through the exact same buildModal
  // lesson→quiz pipeline as a real quest. 40 XP per correct + 40 XP clear
  // bonus — meaningfully more generous per-question than a normal quest
  // (20+50 split across 2 questions), since it's a single-question trial.
  const pick = DAILY_POOL[Math.floor(Math.random()*DAILY_POOL.length)];
  buildModal({title:'Daily Quest', tag:'DAILY QUEST', lesson:'A quick trial. One question, one shot at bonus XP.', questions:[pick]}, 'DAILY QUEST', () => {
    state.dailyUsed = true; // flips the button to "CLEARED" until tomorrow
    render();
  }, 40, 40);
};

/* ============ XP / LEVEL ============ */
// Central XP intake — every XP-granting action in the game (quiz answers,
// quest/boss clear bonuses, Daily Quest) funnels through this one function
// rather than touching state.xp/level directly.
function gainXP(amount){
  if (amount <= 0) return;
  state.xp += amount;
  // A `while`, not an `if`, because a single big XP award (e.g. a Boss clear
  // bonus) can be large enough to cross MULTIPLE level thresholds at once —
  // this loop keeps leveling up (and re-triggering the flash/toast each time)
  // until the remaining xp no longer meets xpNext.
  while (state.xp >= state.xpNext){
    state.xp -= state.xpNext;                         // carry the leftover XP into the new level, don't discard it
    state.level++;
    state.xpNext = Math.round(state.xpNext * 1.22);    // each level requires 22% more XP than the last — a standard RPG-style curve
    state.statPoints += 3;                             // every level-up grants 3 points to spend in the Status view
    triggerLevelUp();                                  // fire the visual/toast feedback for this level-up
  }
  render(); // push the new XP/level/points out to every screen that shows them
}
// Visual + toast feedback for a level-up: a brief full-screen "LEVEL UP" flash
// (see #levelflash / .lu keyframes in style.css) plus a system toast.
// Deliberately does NOT touch rank — rank is a separate, Boss-gated system
// (see renderGates' `unlocked` check), so leveling up alone never skips a Gate.
function triggerLevelUp(){
  const fx = document.getElementById('levelflash');
  fx.classList.add('show');
  setTimeout(() => fx.classList.remove('show'), 1400); // flash auto-hides after 1.4s
  showToast('LEVEL UP', `You are now Level ${state.level}. +3 stat points.`);
}

/* ============ TOASTS ============ */
// Generic "System window" notification used throughout the game (quest
// clears, level-ups, locked-gate warnings, install confirmation, etc.) —
// a small stackable card that self-removes after ~3.8s. The CSS animation
// (.toast's toastin/toastout keyframes) handles the fade in/out timing;
// this function only needs to add and later remove the element.
function showToast(title, sub){
  const wrap = document.getElementById('toasts');
  const t = document.createElement('div');
  t.className = 'toast bracket';
  t.innerHTML = `<span class="bl"></span><span class="br"></span><div class="tt">${title}</div><div class="ts">${sub}</div>`;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 3800); // matches the CSS animation's total duration
}


/* ============ SAVE BUTTONS ============ */
// Top-bar button and Status-screen panel buttons. All real work is in the
// SAVE / LOAD functions above; these just wire the clicks.
document.getElementById('saveBtn').onclick = () => {
  if (saveGame()) showToast('PROGRESS SAVED', 'Stored on this device.');
  else showToast('SAVE BLOCKED', 'Browser storage is unavailable. Use Export Backup.');
};
document.getElementById('saveNowBtn').onclick = document.getElementById('saveBtn').onclick;
document.getElementById('exportBtn').onclick = exportSave;
document.getElementById('importBtn').onclick = () => document.getElementById('importFile').click();
document.getElementById('importFile').onchange = (e) => {
  if (e.target.files[0]) importSave(e.target.files[0]);
  e.target.value = '';   // lets the same file be picked again later
};
document.getElementById('resetBtn').onclick = resetProgress;

/* ============ INIT / AWAKEN ============ */
// One-time intro sequence (the "ARISE" screen from index.html) — clicking
// Accept fades it out, then swaps the full-screen #awaken overlay for the
// real app shell (#app) and reveals the nav bar, which both start hidden
// (display:none) until this fires. The 950ms delay matches the CSS fade
// transition so the swap happens only once #awaken has visibly faded.
document.getElementById('acceptBtn').onclick = () => {
  const awaken = document.getElementById('awaken');
  awaken.style.opacity = '0';
  setTimeout(() => {
    awaken.style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('mainNav').style.display = 'flex';
  }, 950);
  render();  // first paint of the dashboard now that state exists and the DOM is visible
  showToast('SYSTEM LINKED', loadedFromSave
    ? 'Save found. Welcome back, ' + state.name + '.'
    : 'MAXED EDITION — every Gate is cleared. You are the Shadow Monarch.');
};

// Renaming: clicking the player's name in the Status view pops a native
// prompt(). Trimmed and capped at 18 characters so it can't overflow the
// status panel's layout; an empty/whitespace-only entry is simply ignored.
document.getElementById('pName').onclick = () => {
  const n = prompt('Enter your Hunter name:', state.name);
  if (n && n.trim()) { state.name = n.trim().slice(0,18); render(); }
};

// Cosmetic live clock in the top bar — purely decorative "system status"
// flavor, has no effect on game state or progress.
const clockEl = document.getElementById('clockDate');
function tickClock(){
  clockEl.textContent = new Date().toString().slice(0,24).toUpperCase();
}
tickClock(); setInterval(tickClock, 1000);

render(); // initial render on page load, before the player has even clicked "Arise" —
          // keeps the (hidden) dashboard pre-populated so there's no blank-frame flash on accept

/* ============ PWA: install button + service worker ============ */
// None of this affects gameplay — it's what makes the app installable as a
// standalone PWA (home-screen icon, its own window, offline support).
//
// The INSTALL button is now ALWAYS visible in the top bar. Before, it only
// appeared when the browser fired 'beforeinstallprompt', which never happens
// if the app is opened as a plain file, in Safari, in desktop Firefox, or once
// it's already installed — so the button seemed to vanish. Now:
//   - browser ready to install  -> clicking opens the native install dialog
//   - browser NOT ready         -> clicking explains how to install for THEIR
//                                  browser/device (see showInstallHelp)
//   - already running as an app -> shows "INSTALLED" (disabled)
const installBtn = document.getElementById('installBtn');
let deferredInstallPrompt = null;

// True when the game is already running as an installed app (own window / home-screen app).
function isInstalledApp(){
  return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
}
function refreshInstallBtn(){
  if (isInstalledApp()){
    installBtn.textContent = '✓ INSTALLED';
    installBtn.disabled = true;
  } else {
    installBtn.textContent = '⬇ INSTALL';
    installBtn.disabled = false;
  }
}
refreshInstallBtn();

// The browser fires this when it decides the page qualifies as installable
// (valid manifest + service worker + served over http/https). We stash the
// event so our own button can trigger the native dialog on click.
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();                 // stop the browser's automatic mini-infobar
  deferredInstallPrompt = e;          // save it to fire later, on our button click
});

installBtn.onclick = async () => {
  if (!deferredInstallPrompt){ showInstallHelp(); return; }   // not offered yet -> show manual steps
  deferredInstallPrompt.prompt();                             // show the native install dialog
  const choice = await deferredInstallPrompt.userChoice;      // wait for accept / dismiss
  if (choice.outcome === 'accepted') showToast('SYSTEM INSTALLED', 'Java Quest is now on your device.');
  deferredInstallPrompt = null;                               // a captured prompt can only be used once
};

// Installed some other way (e.g. the address-bar icon)? Update the button.
window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  refreshInstallBtn();
  installBtn.textContent = '✓ INSTALLED';
  installBtn.disabled = true;
});

// Shown when the browser hasn't offered a one-click install. Works out which
// situation the player is in and shows only the steps that apply to them.
function showInstallHelp(){
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isFirefoxDesktop = /Firefox/.test(ua) && !isAndroid && !isIOS;
  const isFile = location.protocol === 'file:';

  let title = 'INSTALL JAVA QUEST';
  let steps;
  if (isFile){
    title = 'ALMOST THERE — RUN IT FROM A WEB ADDRESS';
    steps = [
      'You opened <b>index.html</b> straight from a folder. Browsers only allow installing an app that is served from a web address.',
      'In the app folder run <b>python3 -m http.server 8080</b> (or right-click index.html → <b>Open with Live Server</b> in VS Code).',
      'Open <b>http://localhost:8080</b> in Chrome or Edge, then press INSTALL again.',
      'Or drag the folder onto <b>app.netlify.com/drop</b> to get a free web address you can install from on any device.'
    ];
  } else if (isIOS){
    steps = [
      'Open this page in <b>Safari</b>.',
      'Tap the <b>Share</b> button (the square with an arrow).',
      'Choose <b>Add to Home Screen</b>, then tap <b>Add</b>.'
    ];
  } else if (isAndroid){
    steps = [
      'Open the browser menu (<b>⋮</b>) in Chrome.',
      'Tap <b>Install app</b> (or <b>Add to Home screen</b>).',
      'Confirm — Java Quest appears on your home screen.'
    ];
  } else if (isFirefoxDesktop){
    steps = [
      'Firefox on desktop can\'t install web apps.',
      'Open this same address in <b>Chrome</b> or <b>Edge</b> and press INSTALL there.'
    ];
  } else {
    steps = [
      'Look for the <b>install icon</b> at the right end of the address bar (a small monitor with a down-arrow).',
      'Or open the browser menu (<b>⋮</b>) → <b>Install Java Quest</b> (Chrome: under "Cast, save and share"; Edge: under "Apps").',
      'No icon? Reload the page once so the offline helper can register, or the app may already be installed.'
    ];
  }

  document.getElementById('modalBox').classList.remove('battle');
  document.getElementById('modalContent').innerHTML = `
    <div class="mtag">⬇ INSTALL</div>
    <h3>${title}</h3>
    <ol class="install-steps">${steps.map(t => `<li>${t}</li>`).join('')}</ol>
    <div class="modal-actions"><button class="btn solid" id="closeBtn">GOT IT</button></div>`;
  document.getElementById('closeBtn').onclick = closeModal;
  document.getElementById('overlay').classList.add('show');
}

// Registers sw.js (see that file) so the app can be cached for offline use
// once installed. Wrapped in a feature check + .catch() because this fails
// harmlessly (and is expected to) when opened directly via file:// instead
// of a real http(s) server — see README for the two supported ways to serve it.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {/* best-effort; fails harmlessly on file:// or unsupported hosts */});
  });
}
