/**
 * Created by Alejandro on 5/1/2016.
 */
public class Profile {
    public boolean foco1;
    public boolean foco2;

    public boolean isFoco1() {
        return foco1;
    }

    public void setFoco1(boolean foco1) {
        this.foco1 = foco1;
    }

    public boolean isFoco2() {
        return foco2;
    }

    public void setFoco2(boolean foco2) {
        this.foco2 = foco2;
    }

    @Override
    public String toString() {
        return "Profile{" +
                "foco1=" + foco1 +
                ", foco2=" + foco2 +
                '}';
    }
}
