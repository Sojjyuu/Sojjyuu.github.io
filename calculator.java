import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class Calculator extends JFrame implements ActionListener {
    private JTextField display;
    private StringBuilder input = new StringBuilder();
    private double num1 = 0, num2 = 0;
    private char operator = ' ';

    public Calculator() {
        setTitle("Simple Calculator");
        setSize(300, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setLayout(new BorderLayout());

        // Display
        display = new JTextField();
        display.setEditable(false);
        display.setFont(new Font("Arial", Font.BOLD, 24));
        add(display, BorderLayout.NORTH);

        // Buttons
        String[] buttons = {
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", "C", "=", "+"
        };

        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(4, 4, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        
        for (String text : buttons) {
            JButton button = new JButton(text);
            button.setFont(new Font("Arial", Font.BOLD, 20));
            button.addActionListener(this);
            panel.add(button);
        }

        add(panel, BorderLayout.CENTER);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String btn = e.getActionCommand();

        if (btn.matches("[0-9]")) {
            input.append(btn);
            display.setText(input.toString());
        } else if ("+-*/".contains(btn)) {
            if (input.length() > 0) {
                num1 = Double.parseDouble(input.toString());
                input.setLength(0);
                operator = btn.charAt(0);
                display.setText("");
            }
        } else if (btn.equals("=")) {
            if (input.length() > 0 && operator != ' ') {
                num2 = Double.parseDouble(input.toString());
                double result = 0;
                switch (operator) {
                    case '+': result = num1 + num2; break;
                    case '-': result = num1 - num2; break;
                    case '*': result = num1 * num2; break;
                    case '/': 
                        if (num2 != 0) result = num1 / num2;
                        else {
                            display.setText("Error: /0");
                            return;
                        }
                        break;
                }
                display.setText(String.valueOf(result));
                input.setLength(0);
                operator = ' ';
            }
        } else if (btn.equals("C")) {
            input.setLength(0);
            display.setText("");
            num1 = 0;
            num2 = 0;
            operator = ' ';
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new Calculator());
    }
}
