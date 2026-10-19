/* ============ LESSON PRACTICE DRILLS ============ */
// These are the quizzes at the end of each LESSON. They are intentionally a
// different kind of challenge from the Dungeon boss fights (which are pure
// multiple-choice knowledge questions):
//   - read some real Java and work out what it prints (mc + code)
//   - type the missing piece into a code snippet            (type: 'fill')
//   - spot why a snippet breaks                              (mc + code)
//
// DRILLS[gateIndex][questIndex] is an array of 3 questions. script.js attaches
// each array to GATES[gateIndex].quests[questIndex].questions at startup.
//
// Question shapes:
//   multiple choice: {q, code?, c:[choices], a:correctIndex, e:explanation}
//   fill in blank:   {type:'fill', q, code?, answers:[accepted answers], e:explanation}
//     (typed answers ignore extra spaces and a trailing semicolon, but ARE
//      case-sensitive — just like Java itself)

const DRILLS = [

/* ===== E-RANK: Gate of Awakening ===== */
[
  // Variables & Data Types
  [
    {q:"What does this print?",
     code:`int lives = 3;
double speed = 2.5;
System.out.println(lives + speed);`,
     c:["5.5","52.5","3 2.5","It won't compile"], a:0,
     e:"int + double produces a double, so 3 + 2.5 = 5.5."},
    {type:'fill', q:"Complete the declaration so the variable stores the text \"Arise\":",
     code:`____ shout = "Arise";`,
     answers:['String'],
     e:"Text in double quotes is a String — with a capital S. Java is case-sensitive."},
    {q:"Why won't this line compile?",
     code:`int level = 5.5;`,
     c:["5.5 is a double and can't fit into an int without losing the .5","level is a reserved word","5.5 needs quotes around it","An int can never be assigned a value"], a:0,
     e:"A decimal literal is a double. Java refuses to squeeze it into an int automatically because information would be lost."}
  ],
  // Operators
  [
    {q:"What does this print?",
     code:`int a = 17;
System.out.println(a % 5);`,
     c:["2","3","3.4","12"], a:0,
     e:"17 = 3 × 5 + 2, so the remainder (modulo) is 2."},
    {type:'fill', q:"Fill in the operator that checks whether two values are EQUAL:",
     code:`if (score ____ 100) {
    System.out.println("Perfect!");
}`,
     answers:['=='],
     e:"== compares. A single = would assign instead."},
    {q:"What does this print?",
     code:`System.out.println(7 / 2.0);`,
     c:["3","3.5","3.0","4"], a:1,
     e:"When either side is a double, Java uses decimal division: 7 / 2.0 = 3.5."}
  ],
  // Input & Output
  [
    {q:"What is the exact console output?",
     code:`System.out.print("Level ");
System.out.print(1);
System.out.println("!");
System.out.println("Go");`,
     c:["Level 1! on the first line, Go on the second","Level 1!Go all on one line","Level, 1, ! and Go each on their own line","Nothing — print needs a newline first"], a:0,
     e:"print() keeps the cursor on the same line, so 'Level ', '1' and '!' join up. println() ends the line, so 'Go' starts a new one."},
    {type:'fill', q:"Type the Scanner method that reads a whole line of text:",
     code:`Scanner sc = new Scanner(System.in);
String name = sc.____();`,
     answers:['nextLine','nextLine()'],
     e:"nextLine() reads everything the user typed up to the Enter key."},
    {q:"Which import is needed before you can use Scanner?",
     c:["import java.util.Scanner;","import java.io.Scanner;","import scanner.java;","No import is needed"], a:0,
     e:"Scanner lives in the java.util package."}
  ],
  // Comments & Style
  [
    {q:"What does this print?",
     code:`int x = 4;
// x = 10;
/* x = 20; */
System.out.println(x);`,
     c:["4","10","20","Compile error"], a:0,
     e:"Both reassignments are comments, so Java ignores them and x stays 4."},
    {type:'fill', q:"Type the variable name so this prints Jin (capitalization matters!):",
     code:`String userName = "Jin";
System.out.println(____);`,
     answers:['userName'],
     e:"Names must match exactly — userName, not username or UserName."},
    {q:"What does this print?",
     code:`int score = 10;
int Score = 20;
System.out.println(score);`,
     c:["10","20","30","Compile error — duplicate variable"], a:0,
     e:"score and Score are two different variables because Java is case-sensitive. score is still 10."}
  ]
],

/* ===== D-RANK: Gate of Branching Paths ===== */
[
  // If / Else
  [
    {q:"What does this print?",
     code:`int hp = 40;
if (hp > 75) {
    System.out.println("Healthy");
} else if (hp > 25) {
    System.out.println("Hurt");
} else {
    System.out.println("Critical");
}`,
     c:["Healthy","Hurt","Critical","Hurt and Critical"], a:1,
     e:"40 fails hp > 75 but passes hp > 25, so that branch runs. Only one branch of an if / else if chain ever runs."},
    {type:'fill', q:"Fill in the logical operator so BOTH conditions must be true:",
     code:`if (level >= 10 ____ hasKey) {
    openDoor();
}`,
     answers:['&&'],
     e:"&& means AND (both must be true). || means OR."},
    {q:"What happens with this code?",
     code:`int x = 5;
if (x = 5) {
    System.out.println("five");
}`,
     c:["Compile error — = assigns, it doesn't compare","Prints five","Prints nothing","Prints five twice"], a:0,
     e:"= assigns a value and == compares. In Java an int isn't a valid if condition, so this won't compile."}
  ],
  // Switch
  [
    {q:"What does this print?",
     code:`int day = 2;
switch (day) {
    case 1: System.out.print("A");
    case 2: System.out.print("B");
    case 3: System.out.print("C"); break;
    case 4: System.out.print("D");
}`,
     c:["B","BC","ABC","BCD"], a:1,
     e:"day is 2, so it prints B. With no break, execution falls through into case 3 and prints C, then break stops it."},
    {type:'fill', q:"Which keyword handles every value that no case matches?",
     code:`switch (rank) {
    case "S": System.out.println("Monarch"); break;
    ____: System.out.println("Unranked");
}`,
     answers:['default'],
     e:"default is the catch-all branch of a switch."},
    {q:"Which type is NOT allowed as the value of a switch statement?",
     c:["double","String","char","int"], a:0,
     e:"switch works on int-like types, char, String and enums — not double, float, long or boolean."}
  ],
  // For Loops
  [
    {q:"What does this print?",
     code:`int sum = 0;
for (int i = 1; i <= 4; i++) {
    sum += i;
}
System.out.println(sum);`,
     c:["10","4","6","24"], a:0,
     e:"The loop adds 1 + 2 + 3 + 4 = 10."},
    {type:'fill', q:"Fill in the operator so the loop prints 0 through 4 (and not 5):",
     code:`for (int i = 0; i ____ 5; i++) {
    System.out.println(i);
}`,
     answers:['<'],
     e:"i < 5 stops before reaching 5. i <= 5 would print 5 too."},
    {q:"What is wrong with this loop?",
     code:`for (int i = 10; i > 0; i++) {
    System.out.println(i);
}`,
     c:["It never ends — i++ makes i grow, so i > 0 stays true forever","It prints nothing","It counts down correctly","It doesn't compile"], a:0,
     e:"i starts at 10 and keeps increasing, so the condition i > 0 never becomes false. It should be i-- to count down."}
  ],
  // While & Do-While
  [
    {q:"What is printed?",
     code:`int n = 10;
do {
    System.out.print(n + " ");
    n++;
} while (n < 5);`,
     c:["Nothing at all","10 (printed once)","10 11 12 … forever","Compile error"], a:1,
     e:"A do-while runs its body once BEFORE checking the condition. It prints 10, then n < 5 is false so it stops."},
    {type:'fill', q:"Fill in an operator so the loop keeps running while there is health left:",
     code:`int hp = 3;
while (hp ____ 0) {
    hp--;
}`,
     answers:['>','!='],
     e:"hp > 0 keeps looping for hp = 3, 2, 1 and stops when it reaches 0."},
    {q:"What goes wrong here?",
     code:`int i = 0;
while (i < 3) {
    System.out.print(i);
}`,
     c:["i never changes, so it prints 0 forever (infinite loop)","It prints 012","It prints nothing","It doesn't compile"], a:0,
     e:"Nothing inside the loop updates i, so i < 3 is always true. You'd need i++ in the body."}
  ]
],

/* ===== C-RANK: Gate of Structures ===== */
[
  // Arrays
  [
    {q:"What does this print?",
     code:`int[] hp = {30, 45, 60};
hp[1] = 99;
System.out.println(hp[0] + hp[1]);`,
     c:["129","75","90","Compile error"], a:0,
     e:"hp[1] was changed to 99, so hp[0] + hp[1] = 30 + 99 = 129."},
    {type:'fill', q:"What goes in the blank to print the size of the array (5)?",
     code:`int[] nums = new int[5];
System.out.println(nums.____);`,
     answers:['length'],
     e:"Arrays use .length with no parentheses."},
    {q:"What happens when this runs?",
     code:`int[] a = {1, 2, 3};
System.out.println(a[3]);`,
     c:["It crashes with ArrayIndexOutOfBoundsException","Prints 3","Prints 0","Prints null"], a:0,
     e:"The valid indexes are 0, 1 and 2. Index 3 doesn't exist, so Java throws an exception."}
  ],
  // Strings
  [
    {q:"What does this print?",
     code:`String s = "Hunter";
System.out.println(s.charAt(1) + "" + s.length());`,
     c:["u6","H6","u5","n6"], a:0,
     e:"charAt(1) is the second character, 'u'. length() is 6. Joined together: u6."},
    {type:'fill', q:"Which method compares two Strings while ignoring upper/lower case (this should print true)?",
     code:`String a = "arise";
String b = "ARISE";
System.out.println(a.____(b));`,
     answers:['equalsIgnoreCase'],
     e:"equalsIgnoreCase() compares the text and ignores capitalization."},
    {q:"What does this print?",
     code:`String s = "Java";
s.toUpperCase();
System.out.println(s);`,
     c:["Java","JAVA","java","Compile error"], a:0,
     e:"Strings are immutable. toUpperCase() returns a NEW String, and since the result wasn't stored, s is unchanged."}
  ],
  // Methods
  [
    {q:"What does this print?",
     code:`static int damage(int base, int bonus) {
    return base * 2 + bonus;
}
// in main:
System.out.println(damage(10, 5));`,
     c:["25","30","20","15"], a:0,
     e:"base * 2 + bonus = 10 * 2 + 5 = 25."},
    {type:'fill', q:"What return type goes in the blank (this method gives nothing back)?",
     code:`static ____ greet(String name) {
    System.out.println("Hi " + name);
}`,
     answers:['void'],
     e:"void means the method does something but returns no value."},
    {q:"What does this print?",
     code:`static void boost(int hp) {
    hp = hp + 50;
}
// in main:
int health = 100;
boost(health);
System.out.println(health);`,
     c:["100","150","50","Compile error"], a:0,
     e:"Java passes a COPY of the value. Changing hp inside boost() doesn't change health in main."}
  ],
  // ArrayList
  [
    {q:"What does this print?",
     code:`ArrayList<String> party = new ArrayList<>();
party.add("Tank");
party.add("Mage");
party.add(1, "Healer");
System.out.println(party);`,
     c:["[Tank, Healer, Mage]","[Tank, Mage, Healer]","[Healer, Tank, Mage]","Compile error"], a:0,
     e:"add(index, value) inserts at that position and shifts everything after it to the right."},
    {type:'fill', q:"Which method gets the element at a given position (this prints Tank)?",
     code:`ArrayList<String> party = new ArrayList<>();
party.add("Tank");
System.out.println(party.____(0));`,
     answers:['get'],
     e:"get(index) returns the element at that index."},
    {q:"Which is the correct way to declare an ArrayList of whole numbers?",
     c:["ArrayList<Integer> nums = new ArrayList<>();","ArrayList<int> nums = new ArrayList<>();","ArrayList nums = new int[];","int ArrayList nums;"], a:0,
     e:"Generics need object types, so you use the wrapper class Integer, not the primitive int."}
  ]
],

/* ===== B-RANK: Gate of Objects ===== */
[
  // Classes & Objects
  [
    {q:"What does this print?",
     code:`class Hunter { String name; int level = 1; }

Hunter a = new Hunter();
Hunter b = new Hunter();
a.level = 50;
System.out.println(b.level);`,
     c:["1","50","0","Compile error"], a:0,
     e:"Each object has its own copy of the fields. Changing a.level doesn't touch b.level."},
    {type:'fill', q:"Which symbol reaches into an object to use one of its fields?",
     code:`Hunter jin = new Hunter();
jin____level = 10;`,
     answers:['.'],
     e:"The dot operator accesses an object's fields and methods: jin.level."},
    {q:"What is wrong with this code?",
     code:`Hunter h;
h.level = 5;`,
     c:["h was never given an object, so there is nothing to hold level","level is private","Hunter is not a class","Nothing — it compiles fine"], a:0,
     e:"Declaring a variable doesn't create an object. You need h = new Hunter(); first."}
  ],
  // Constructors
  [
    {q:"What does this print?",
     code:`class Hunter {
    String name; int level;
    Hunter(String name, int level) {
        this.name = name;
        this.level = level;
    }
}
Hunter h = new Hunter("Jin", 3);
System.out.println(h.name + h.level);`,
     c:["Jin3","Jin 3","3Jin","Compile error"], a:0,
     e:"The constructor stores name = Jin and level = 3. Joining them gives Jin3."},
    {type:'fill', q:"What name must the constructor have?",
     code:`class Hunter {
    int level;
    ____(int level) {
        this.level = level;
    }
}`,
     answers:['Hunter'],
     e:"A constructor always has exactly the same name as its class."},
    {q:"Why does this fail to compile?",
     code:`class Hunter {
    Hunter(String n) { }
}
Hunter h = new Hunter();`,
     c:["The only constructor needs a String, but none was given","Constructors can't be empty","new can't be used with classes","Hunter has to be static"], a:0,
     e:"Once you write any constructor yourself, Java stops providing the free no-argument one."}
  ],
  // Encapsulation
  [
    {q:"What does this print?",
     code:`class Hunter {
    private int hp = 100;
    public void damage(int d) { if (d > 0) hp -= d; }
    public int getHp() { return hp; }
}
Hunter h = new Hunter();
h.damage(30);
h.damage(-500);
System.out.println(h.getHp());`,
     c:["70","-430","100","-500"], a:0,
     e:"damage() ignores negative values, so only the 30 is applied: 100 - 30 = 70."},
    {type:'fill', q:"Complete the getter so it returns the private field:",
     code:`private int hp;
public int getHp() {
    return ____;
}`,
     answers:['hp','this.hp'],
     e:"A getter simply returns the field's current value."},
    {q:"What is the main reason to put validation inside a setter?",
     c:["So invalid values (like negative HP) can never be stored","It makes the program run faster","The compiler requires it","It turns the field into a static field"], a:0,
     e:"A setter is the gatekeeper: it can reject or fix bad values before they reach the field."}
  ],
  // this & static
  [
    {q:"What does this print?",
     code:`class Hunter {
    static int count = 0;
    Hunter() { count++; }
}
new Hunter();
new Hunter();
new Hunter();
System.out.println(Hunter.count);`,
     c:["3","1","0","Compile error"], a:0,
     e:"count is static, so there is ONE shared copy for the whole class. Each constructor call adds 1 to it."},
    {type:'fill', q:"Which keyword makes the field shared by every object of the class?",
     code:`class Counter {
    ____ int total = 0;
}`,
     answers:['static'],
     e:"static members belong to the class itself, not to any single object."},
    {q:"Why does this fail to compile?",
     code:`class Hunter {
    int level;
    static void show() {
        System.out.println(level);
    }
}`,
     c:["A static method can't use an instance field — there is no object","println can't be used in static methods","level must be private","show() needs a return value"], a:0,
     e:"Static methods belong to the class and have no 'current object', so they can't see per-object fields like level."}
  ]
],

/* ===== A-RANK: Gate of Inheritance ===== */
[
  // Inheritance
  [
    {q:"What does this print?",
     code:`class Hunter { String rank() { return "E"; } }
class Elite extends Hunter { }

Elite e = new Elite();
System.out.println(e.rank());`,
     c:["E","null","Nothing — Elite has no rank()","Compile error"], a:0,
     e:"Elite inherits rank() from Hunter, so the call works and returns E."},
    {type:'fill', q:"Type the field name that prints 10 (it is inherited from Hunter):",
     code:`class Hunter { int power = 10; }
class Mage extends Hunter { }

Mage m = new Mage();
System.out.println(m.____);`,
     answers:['power'],
     e:"Mage inherits the power field from Hunter."},
    {q:"What does this print?",
     code:`class A { void hi() { System.out.print("A"); } }
class B extends A { void yo() { System.out.print("B"); } }

B b = new B();
b.hi();
b.yo();`,
     c:["AB","BA","A","Compile error — hi() isn't in B"], a:0,
     e:"b.hi() is inherited from A and prints A; then b.yo() prints B."}
  ],
  // Polymorphism
  [
    {q:"What does this print?",
     code:`class Hunter { void attack() { System.out.print("Punch "); } }
class Mage extends Hunter {
    @Override
    void attack() { System.out.print("Fireball "); }
}
Hunter[] team = { new Hunter(), new Mage(), new Hunter() };
for (Hunter h : team) h.attack();`,
     c:["Punch Fireball Punch ","Punch Punch Punch ","Fireball Fireball Fireball ","Compile error"], a:0,
     e:"Each object runs ITS OWN version of attack(): Hunter punches, the Mage casts Fireball."},
    {type:'fill', q:"Type the annotation (including the @) that marks a method as replacing the parent's version:",
     code:`class Mage extends Hunter {
    ____
    void attack() { System.out.println("Fireball"); }
}`,
     answers:['@Override'],
     e:"@Override tells the compiler this method intentionally replaces an inherited one."},
    {q:"Why does the compiler complain about this code?",
     code:`class Hunter { void rest() { } }
class Mage extends Hunter {
    @Override
    void rset() { }
}`,
     c:["@Override finds no matching rest() in the parent (the name is misspelled)","Mage can't have its own methods","rest() must be static","@Override only works on constructors"], a:0,
     e:"@Override is a safety check: it produces an error if nothing is actually being overridden."}
  ],
  // Interfaces
  [
    {q:"What does this print?",
     code:`interface Healer { int heal(); }
class Cleric implements Healer {
    public int heal() { return 25; }
}
Healer h = new Cleric();
System.out.println(h.heal() * 2);`,
     c:["50","25","2","Compile error"], a:0,
     e:"A Cleric is a Healer. heal() returns 25 and 25 * 2 = 50."},
    {type:'fill', q:"What method name must Dragon define to satisfy the interface?",
     code:`interface Flyer { void fly(); }
class Dragon implements Flyer {
    public void ____() { System.out.println("flap"); }
}`,
     answers:['fly'],
     e:"The class must provide every method the interface declares — here, fly()."},
    {q:"A class can implement several interfaces. Which declaration is valid?",
     c:["class Dragon implements Flyer, Swimmer { }","class Dragon implements Flyer extends Swimmer { }","class Dragon extends Flyer, Swimmer { }","class Dragon implements Flyer + Swimmer { }"], a:0,
     e:"List multiple interfaces after implements, separated by commas."}
  ],
  // Abstract Classes
  [
    {q:"What does this print?",
     code:`abstract class Monster {
    abstract String roar();
    String intro() { return "I say: " + roar(); }
}
class Goblin extends Monster {
    String roar() { return "Grr"; }
}
System.out.println(new Goblin().intro());`,
     c:["I say: Grr","I say: null","Grr","Compile error — Monster is abstract"], a:0,
     e:"Goblin fills in roar(), and the inherited intro() calls it, giving I say: Grr."},
    {type:'fill', q:"Which keyword marks a method that has no body and must be defined by subclasses?",
     code:`abstract class Monster {
    ____ String roar();
}`,
     answers:['abstract'],
     e:"abstract methods only have a signature; each concrete subclass supplies the body."},
    {q:"Which of these can an abstract class contain?",
     c:["Both abstract methods and regular methods with bodies","Only abstract methods","Only regular methods","Only constants"], a:0,
     e:"An abstract class can mix finished methods and abstract ones — that's what separates it from a plain interface."}
  ]
],

/* ===== S-RANK: Gate of the Monarch ===== */
[
  // Exception Handling
  [
    {q:"What does this print?",
     code:`try {
    System.out.print("A");
    int x = 5 / 0;
    System.out.print("B");
} catch (ArithmeticException e) {
    System.out.print("C");
} finally {
    System.out.print("D");
}`,
     c:["ACD","ABD","ABCD","AD"], a:0,
     e:"A prints, then 5 / 0 throws, skipping B. The catch prints C, and finally always prints D."},
    {type:'fill', q:"Which keyword handles the error?",
     code:`try {
    riskyThing();
} ____ (Exception e) {
    System.out.println("handled");
}`,
     answers:['catch'],
     e:"catch intercepts the exception thrown inside the try block."},
    {q:"What happens when this runs?",
     code:`int[] a = new int[2];
try {
    a[5] = 1;
} catch (ArithmeticException e) {
    System.out.println("caught");
}`,
     c:["The program crashes — the catch type doesn't match the exception","Prints caught","Prints nothing and carries on","Compile error"], a:0,
     e:"A catch only handles its own exception type. This throws ArrayIndexOutOfBoundsException, which is not an ArithmeticException."}
  ],
  // Collections Framework
  [
    {q:"What does this print?",
     code:`Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("quest");
tags.add("java");
System.out.println(tags.size());`,
     c:["2","3","1","Compile error"], a:0,
     e:"A Set ignores duplicates, so the second \"java\" is not added. Size is 2."},
    {type:'fill', q:"Which Map method stores a key-value pair?",
     code:`Map<String, Integer> hp = new HashMap<>();
hp.____("Jin", 120);`,
     answers:['put'],
     e:"put(key, value) adds the pair (or overwrites an existing key's value)."},
    {q:"What does this print?",
     code:`Map<String, Integer> m = new HashMap<>();
m.put("a", 1);
m.put("a", 2);
System.out.println(m.size() + " " + m.get("a"));`,
     c:["1 2","2 2","2 1","1 1"], a:0,
     e:"Putting the same key again overwrites the old value, so the map still has 1 entry and its value is 2."}
  ],
  // Generics
  [
    {q:"What does this print?",
     code:`List<Integer> nums = new ArrayList<>();
nums.add(4);
nums.add(6);
int total = 0;
for (int n : nums) total += n;
System.out.println(total);`,
     c:["10","46","2","Compile error"], a:0,
     e:"Because the list is List<Integer>, each n is already an int — no casting needed. 4 + 6 = 10."},
    {type:'fill', q:"What type goes between the angle brackets so the list holds Strings?",
     code:`List<____> words = new ArrayList<>();
words.add("hello");`,
     answers:['String'],
     e:"List<String> restricts the list to String elements."},
    {q:"Which line is valid Java?",
     c:["Map<String, Integer> m = new HashMap<>();","Map<String> m = new HashMap<>();","Map<Integer, > m;","Map m<String, Integer>;"], a:0,
     e:"A Map takes TWO type arguments: the key type and the value type."}
  ],
  // Streams & Lambdas
  [
    {q:"What does this print?",
     code:`List<Integer> nums = List.of(1, 2, 3, 4, 5, 6);
System.out.println(nums.stream().filter(n -> n > 3).count());`,
     c:["3","4","6","2"], a:0,
     e:"filter keeps 4, 5 and 6, so count() is 3."},
    {type:'fill', q:"Which stream method transforms every element (this turns [1,2,3] into [10,20,30])?",
     code:`nums.stream().____(n -> n * 10).toList();`,
     answers:['map'],
     e:"map() applies a function to each element and collects the results."},
    {q:"What does this give you?",
     code:`names.stream()
     .filter(n -> n.startsWith("J"))
     .toList()`,
     c:["A list of only the names that start with J","A list of every name's first letter","A single true/false value","The number of names"], a:0,
     e:"filter keeps only the elements whose condition is true — here, names starting with J."}
  ]
]

];
