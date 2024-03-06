from ServerConnection import ServerConnection


def choose_city(cities):
    """Permite al usuario elegir una ciudad ingresando su nombre."""
    city_names = [city['name'] for city in cities]

    while True:
        print("Ciudades disponibles:")
        for name in city_names:
            print(name)
        choice = input("Escribe el nombre de tu ciudad: ").strip()

        if choice in city_names:
            return choice
        else:
            print(
                "Por favor, elige una opción válida. Asegúrate de escribir el nombre exactamente como aparece en la lista.")


def start_simulation(conn, cities):
    # Solicita al usuario que seleccione la ciudad de origen y destino una sola vez al principio
    print("Bienvenido a la simulación del vuelo.")
    print("Selecciona la ciudad de origen:")
    origin = choose_city(cities)
    print("Selecciona la ciudad de destino:")
    destination = choose_city(cities)

    if origin == destination:
        print("La ciudad de origen y destino no pueden ser la misma. Por favor, reinicia la selección.")
        return

    while True:
        route = conn.get_route(origin, destination)

        if not route:
            print("No se pudo encontrar una ruta eficiente entre las ciudades seleccionadas.")
            break

        print(f"La ruta más eficiente desde {origin} hasta {destination} es: {', '.join(route)}")
        if len(route) == 1 and route[0] == destination:
            print("El avión ha llegado a su destino final.")
            break

        origin = route[0]
        print(
            f"El avión se encuentra actualmente en {origin}. Presiona Enter para continuar al siguiente tramo del viaje.")
        input()


def main():
    conn = ServerConnection()
    cities = conn.get_cities()
    start_simulation(conn, cities)


if __name__ == "__main__":
    main()
