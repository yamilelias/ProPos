/**
 * Created by Alejandro on 5/1/2016.
 */
public class Profile {
    public boolean foco1;
    public boolean fooc2;

    public boolean isFoco1() {
        return foco1;
    }

    public void setFoco1(boolean foco1) {
        this.foco1 = foco1;
    }

    public boolean isFooc2() {
        return fooc2;
    }

    public void setFooc2(boolean fooc2) {
        this.fooc2 = fooc2;
    }

    @Override
    public String toString() {
        return "Profile{" +
                "foco1=" + foco1 +
                ", fooc2=" + fooc2 +
                '}';
    }
}
